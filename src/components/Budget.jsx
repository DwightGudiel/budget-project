import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

function Budget({ budget, setBudget, setIsValidBudget }) {
  
  // Guardar Presupuesto
  const handleBudget = (e) => {
    e.preventDefault();

    // Validar 
    if (!Number(budget) || Number(budget) < 0) {
      
      // Mostrar alerta
      Swal.fire({
        position: "center",
        icon: "error",
        title: "El presupuesto debe ser un número y mayor que 0",
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    }

    // Mostrar el componente ExpensePanel
    setIsValidBudget(true);
  };

  return (
    <Container>
      <div className="mt-5 p-3 shadow budget-container">
        <Form onSubmit={handleBudget}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="budget" className="fw-bold">
              Ingresa tu Presupuesto:{" "}
            </Form.Label>
            <Form.Control
              value={budget}
              id="budget"
              onChange={(e) => setBudget(Number(e.target.value))}
              type="text"
              placeholder="Escribe tu presupuesto ejemplo: 300"
            />
          </Form.Group>

          <Button variant="primary" className="w-100" type="submit">
            {" "}
            Añadir Presupuesto
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Budget;
