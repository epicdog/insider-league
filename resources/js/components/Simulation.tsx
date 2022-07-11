import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { getFixtures, generateFixtures, startSimulation, simulateWeek, simulateAll, resetFixtures, getPredictions, calculate } from '../features/fixtureSlice';

import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import Teams from './Teams';
import Matches from './Matches';
import League from './League';
import Week from './Week';
import Predictions from './Predictions';

function Simulation() {
    const dispatch = useAppDispatch()
    const fixtures = useAppSelector((state) => state.fixtures)
    const [showAlert, setShowAlert] = useState(true);


    const handleLoading = useCallback(async () => {
        dispatch(getFixtures()).then(() => {
            dispatch(calculate());
            dispatch(getPredictions());
        });
    }, []);

    const handleGenerateFixture = useCallback(async () => {
        dispatch(generateFixtures());
        setShowAlert(true);
    }, []);

    const handleStartSimulation = useCallback(async () => {
        dispatch(startSimulation());
        console.log("handleStartSimulation");
    }, []);

    const handlePlayAll = useCallback(async () => {
        console.log("handlePlayAll");
        dispatch(simulateAll()).then(() => {
            dispatch(calculate());
            dispatch(getPredictions())
        });
    }, []);

    const handlePlayNext = useCallback(async () => {
        console.log("handlePlayNext");
        dispatch(simulateWeek()).then(() => {
            dispatch(calculate());
            dispatch(getPredictions())
        });
    }, []);

    const handleResetData = useCallback(async () => {
        console.log("handleResetData");
        dispatch(resetFixtures());
    }, []);

    useEffect((): void => {
        handleLoading()
    }, []);


    switch (fixtures.step) {
        case 'teams':
            return (
                <Row className="justify-content-center teams">
                    {showAlert && fixtures.error &&
                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                {fixtures.error}
                            </p>
                        </Alert>
                    }
                    <Col md={6}>
                        <Teams />
                        {!fixtures.isTeamsLoading &&
                            <Button variant="warning" disabled={fixtures.isFixturesLoading} onClick={() => handleGenerateFixture()}>Generate Fixtures</Button>
                        }
                    </Col>
                </Row>
            );
            break;
        case 'fixtures':
            return (
                <Row className="justify-content-center teams">
                    <Col>
                        <Matches />
                        <Button variant="warning" onClick={() => handleStartSimulation()}>Start Simulation</Button>{' '}
                    </Col>
                </Row>
            )
        case 'simulation':
            return (
                <Row className="justify-content-center teams">
                    <Col>
                        <h2 className='text-center'>Simulation</h2>
                        <Row>
                            <Col md={12} xl={6}>
                                <League />
                            </Col>
                            <Col md={6} xl={3}>
                                <Week />
                            </Col>
                            <Col md={6} xl={3}>
                                <Predictions />
                            </Col>
                        </Row>
                        <Button variant="warning" disabled={fixtures.isFixturesLoading} onClick={() => handlePlayAll()}>Play All Weeks</Button>{' '}
                        <Button className="mx-4" variant="warning" disabled={fixtures.isFixturesLoading} onClick={() => handlePlayNext()}>Play {fixtures.week == 0 ? 'First' : 'Next'} Week</Button>{' '}
                        <Button variant="danger" disabled={fixtures.isFixturesLoading} onClick={() => handleResetData()}>Reset Data</Button>{' '}
                    </Col>
                </Row>
            )
        default:
            return (
                <div className="teams">
                    <Spinner animation="border" variant="warning" />
                </div>
            );
    }
}

export default Simulation