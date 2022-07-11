import { useAppDispatch, useAppSelector } from '../hooks';

import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table'

function Matches() {
    const dispatch = useAppDispatch()
    const fixtures = useAppSelector((state) => state.fixtures)
    const weeks = Array.from({ length: (fixtures.teams.length - 1) * 2 }, (v, i) => i);

    if (fixtures.isFixturesLoading) {
        return (
            <div className="teams">
                <Spinner animation="border" variant="warning" />
            </div>
        );
    }

    return (
        <div className="matches my-4">
            <h2 className='text-center'>Generated Fixtures</h2>
            <Row xs={1} md={4} className="g-4">
                {weeks.map((week: any) => (
                    <Col key={week}>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Week {week + 1}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fixtures.matches.filter((e: any) => e.week === week + 1).map((match: any) => (
                                    <tr key={match.id}>
                                        <td>
                                            {match.is_dummy ?
                                                <>
                                                    {match.home_id == 0 ?
                                                         fixtures.teams.find((e: any) => e.id === match.away_id).name 
                                                        :
                                                         fixtures.teams.find((e: any) => e.id === match.home_id).name
                                                    }
                                                    has no match!
                                                </>
                                                :
                                                <>
                                                    {fixtures.teams.find((e: any) => e.id === match.home_id).name} - {fixtures.teams.find((e: any) => e.id === match.away_id).name}
                                                </>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Matches