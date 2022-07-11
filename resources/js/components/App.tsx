import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Simulation from './Simulation';

function App() {

    return (
        <div className="App">
            <Container fluid="md">
                <Row>
                    <Col>
                        <h1 className="text-center">Insider Champions League</h1>
                    </Col>
                </Row>
                <Simulation />
            </Container>
        </div>
    )
}

export default App