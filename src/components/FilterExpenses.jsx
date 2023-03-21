import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

function FilterExpense({ filter, setFilter }) {
  return (
    <Container className="shadow p-4 mt-5">
      <Form>
        <Form.Group className="mb-3 d-md-flex gap-md-3">
          <Form.Label className="fw-bold fs-4">Categoría: </Form.Label>
          <Form.Control
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            as="select"
            className="text-center fw-bold fs-4"
          >
            <option value="">-- Selecciona una opción --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default FilterExpense;
