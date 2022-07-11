import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const getFixtures = async () => {
  return axios.get("/api/fixtures",
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
    .then(async (response: AxiosResponse) => {
      return response.data;
    })
    .catch((reason: AxiosError) => {
      console.log("getTeams error", reason.request, reason.response)
    });
};

const getPredictions = async () => {
  return axios.get("/api/predictions",
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
    .then(async (response: AxiosResponse) => {
      return response.data;
    })
    .catch((reason: AxiosError) => {
      console.log("getTeams error", reason.request, reason.response)
    });
};

const resetFixtures = async () => {
  return axios.post("/api/fixtures/reset",
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
    .then(async (response: AxiosResponse) => {
      return response.data;
    })
    .catch((reason: AxiosError) => {
      console.log("resetFixtures error", reason.request, reason.response)
    });
};

const generateFixtures = async () => {
  return axios.post("/api/fixtures/generate",
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
    .then(async (response: AxiosResponse) => {
      return response.data;
    })
    .catch((reason: AxiosError) => {
      console.log("generateFixtures error", reason.request, reason.response)
    });
};

const simulateWeek = async () => {
  return axios.post("/api/fixtures/simulate/week",
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
    .then(async (response: AxiosResponse) => {
      return response.data;
    })
    .catch((reason: AxiosError) => {
      console.log("simulateWeek error", reason.request, reason.response)
    });
};

const simulateAll = async () => {
  return axios.post("/api/fixtures/simulate/all",
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
    .then(async (response: AxiosResponse) => {
      return response.data;
    })
    .catch((reason: AxiosError) => {
      console.log("simulateWeek error", reason.request, reason.response)
    });
};

const fixtureService = {
  getFixtures,
  getPredictions,
  resetFixtures,
  generateFixtures,
  simulateWeek,
  simulateAll,
};

export default fixtureService;