import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import fixtureService from '../services/fixtureService'
import type { RootState, AppDispatch } from './store'

// Define a type for the slice state
interface FixturesState {
  teams: any
  matches: any
  week: number
  isTeamsLoading: boolean
  isFixturesLoading: boolean
  isPredicting: boolean
  step: string
  error: string | boolean
}

// Define the initial state using that type
const initialState: FixturesState = {
  teams: [],
  matches: [],
  week: 0,
  step: 'teams',
  isTeamsLoading: true,
  isFixturesLoading: false,
  isPredicting: true,
  error: false,
}

export const getFixtures = createAsyncThunk(
  "fixtures/get",
  async (params, thunkAPI) => {
    try {
      const data: any = await fixtureService.getFixtures()
      if (!data) {
        return thunkAPI.rejectWithValue('error')
      }
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message)
    }
  }
);

export const getPredictions = createAsyncThunk(
  "probility/get",
  async (params, thunkAPI) => {
    try {
      const data: any = await fixtureService.getPredictions()
      if (!data) {
        return thunkAPI.rejectWithValue('error')
      }
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message)
    }
  }
);

export const resetFixtures = createAsyncThunk(
  "fixtures/reset",
  async (params, thunkAPI) => {
    try {
      const data: any = await fixtureService.resetFixtures()
      if (!data) {
        return thunkAPI.rejectWithValue('error')
      }
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message)
    }
  }
);

export const generateFixtures = createAsyncThunk(
  "fixtures/generate",
  async (params, thunkAPI) => {
    try {
      const data: any = await fixtureService.generateFixtures()
      if (!data) {
        return thunkAPI.rejectWithValue('error')
      }
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message)
    }
  }
);

export const simulateWeek = createAsyncThunk<
  // return value
  any,
  // parameters
  string,
  // types for thunkAPI
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "fixtures/simulate/week",
  async (params, thunkAPI) => {
    try {
      const data: any = await fixtureService.simulateWeek()
      if (!data) {
        return thunkAPI.rejectWithValue('error')
      }
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message)
    }
  }, {
  condition: (params, thunkAPI) => {
    const { fixtures } = thunkAPI.getState()
    return ((fixtures.teams.length - 1) * 2) >= fixtures.week
  },
}
);

export const simulateAll = createAsyncThunk<
  // return value
  any,
  // parameters
  string,
  // types for thunkAPI
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "fixtures/simulate/all",
  async (params, thunkAPI) => {
    try {
      const data: any = await fixtureService.simulateAll()
      if (!data) {
        return thunkAPI.rejectWithValue('error')
      }
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message)
    }
  }, {
  condition: (params, thunkAPI) => {
    const { fixtures } = thunkAPI.getState()
    return ((fixtures.teams.length - 1) * 2) >= fixtures.week
  },
}
);

export const fixtureSlice = createSlice({
  name: 'fixtures',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    calculate: (state) => {
      state.teams.map((team: any) => {
        team.points = 0;
        team.won = 0;
        team.lost = 0;
        team.draw = 0;
        team.gd = 0;
      })
      state.matches.map((match: any) => {
        if (match.is_completed) {
          let home = state.teams.find((m: any) => m.id === match.home_id);
          let away = state.teams.find((m: any) => m.id === match.away_id);
          home.gd = home.gd + match.home_score - match.away_score;
          away.gd = away.gd + match.away_score - match.home_score;
          if (match.home_score > match.away_score) {
            home.points += 3;
            home.won += 1;
            away.lost += 1;
          } else if (match.home_score < match.away_score) {
            away.points += 3;
            away.won += 1;
            home.lost += 1;
          }
          else {
            home.points += 1;
            home.draw += 1;
            away.points += 1;
            away.draw += 1;
          }
        }
      })
      state.teams.sort((a: any, b: any) => {
        if (a.points == b.points) {
          if (a.won == b.won) {
            if (a.draw == b.draw) {
              if (a.lost == b.lost) {
                return a.gd < b.gd ? 1 : -1
              }
              return a.lost > b.lost ? 1 : -1
            }
            return a.draw < b.draw ? 1 : -1
          }
          return a.won < b.won ? 1 : -1
        }
        return a.points < b.points ? 1 : -1
      })
    },
    startSimulation: (state) => {
      state.step = 'simulation'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFixtures.pending, (state, action) => {
      state.isTeamsLoading = true;
    });
    builder.addCase(getFixtures.fulfilled, (state, action) => {
      state.teams = action.payload.data.teams;
      if (action.payload.data.matches.length > 0) {
        state.matches = action.payload.data.matches;
        state.step = 'fixtures';
        if (action.payload.data.matches.find((e: any) => e.is_completed == true)) {
          state.step = 'simulation';
          state.week = action.payload.data.week;
        }
      }
      state.isTeamsLoading = false;
    });
    builder.addCase(getFixtures.rejected, (state, action) => {
      state.isTeamsLoading = false;
    });
    builder.addCase(getPredictions.pending, (state, action) => {
      state.isPredicting = true;
    });
    builder.addCase(getPredictions.fulfilled, (state, action) => {
      state.isPredicting = false;
      console.log(action.payload);

      state.teams.map((team: any) => {
        team.prediction = action.payload[team.id].probability;
      })

    });
    builder.addCase(getPredictions.rejected, (state, action) => {
      state.isPredicting = false;
    });
    builder.addCase(resetFixtures.pending, (state, action) => {
      state.isTeamsLoading = true;
    });
    builder.addCase(resetFixtures.fulfilled, (state, action) => {
      state.teams = action.payload.data.teams;
      state.matches = action.payload.data.matches;
      state.week = 0;
      state.step = 'teams';
      state.isTeamsLoading = false;
    });
    builder.addCase(resetFixtures.rejected, (state, action) => {
      state.isTeamsLoading = false;
    });
    builder.addCase(generateFixtures.pending, (state, action) => {
      state.isFixturesLoading = true;
      state.error = false;
    });
    builder.addCase(generateFixtures.fulfilled, (state, action) => {
      if (!action.payload.error) {
        state.matches = action.payload.fixtures.matches;
        state.step = 'fixtures';
      } else {
        state.error = action.payload.error;
      }
      state.isFixturesLoading = false;
    });
    builder.addCase(generateFixtures.rejected, (state, action) => {
      state.isFixturesLoading = false;
    });
    builder.addCase(simulateWeek.pending, (state, action) => {
      state.isFixturesLoading = true;
      state.error = false;
    });
    builder.addCase(simulateWeek.fulfilled, (state, action) => {
      if (!action.payload.error) {
        state.matches = action.payload.fixtures.matches;
        state.week = action.payload.fixtures.week;
        state.step = 'simulation';
      } else {
        state.error = action.payload.error;
      }
      state.isFixturesLoading = false;
    });
    builder.addCase(simulateWeek.rejected, (state, action) => {
      state.isFixturesLoading = false;
    });
    builder.addCase(simulateAll.pending, (state, action) => {
      state.isFixturesLoading = true;
      state.error = false;
    });
    builder.addCase(simulateAll.fulfilled, (state, action) => {
      if (!action.payload.error) {
        state.matches = action.payload.fixtures.matches;
        state.week = action.payload.fixtures.week;
        state.step = 'simulation';
      } else {
        state.error = action.payload.error;
      }
      state.isFixturesLoading = false;
    });
    builder.addCase(simulateAll.rejected, (state, action) => {
      state.isFixturesLoading = false;
    });
  }
})

export const { startSimulation, calculate } = fixtureSlice.actions

export default fixtureSlice.reducer
