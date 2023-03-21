import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { formatQuantity } from "../helpers";

function ExpensePanel({
  budget,
  expensesArray,
  setExpensesArray,
  setIsValidBudget,
  setBudget,
}) {
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);
  const [percentage, setPorcentaje] = useState(0);

  // Calcular el total gastado y el total disponible
  useEffect(() => {
    // Calcular total gastado
    const totalSpent = expensesArray.reduce((total, expense) => {
      return total + Number(expense.quantity);
    }, 0);

    // Calcular total disponible
    const totalAvaliable = budget - totalSpent;

    //Calcular porcentaje gastado
    const totalPercentage = (
      ((budget - totalAvaliable) / budget) *
      100
    ).toFixed(2);

    // Actualizando state
    setSpent(totalSpent);
    setAvailable(totalAvaliable);
    setPorcentaje(totalPercentage);
  }, [expensesArray]);

  // Reinicar aplicación
  const handleResetApp = () => {
    setExpensesArray([]);
    setBudget(0);
    setIsValidBudget(false);
  };

  return (
    <Container className="mt-5 p-3 shadow rounded">
      <h2 className="text-center fs-3 py-3 fw-bold border-bottom">
        Resumen de su Presupuesto
      </h2>

      <div className="d-flex justify-content-end me-5 my-5 my-md-0">
        <Button onClick={handleResetApp} variant="danger fs-3">
          Reiniciar Aplicación
        </Button>
      </div>
      <Row className="justify-content-center align-items-center">
        <Col md={4} className="text-center">
          <CircularProgressbar
            styles={buildStyles({
              pathColor: percentage > 100 ? "red" : "#3B82F6",
              trailColor: "#F5F5F5",
              textColor: percentage > 100 ? "red" : "#3B82F6",
            })}
            value={percentage}
            text={`${percentage}%`}
          />
        </Col>
        <Col md={8} className="mt-5 mt-md-0 text-center text-md-start fs-3">
          <p className="fw-bold text-primary">
            Presupuesto:{" "}
            <span className="fw-normal text-dark">
              {formatQuantity(budget)}
            </span>
          </p>
          <p className="fw-bold text-primary">
            Presupuesto Disponible:{" "}
            <span
              className={`fw-normal ${
                available < 0 ? "text-danger" : "text-dark"
              }`}
            >
              {formatQuantity(available)}
            </span>
          </p>
          <p className="fw-bold text-primary">
            Total Gastado:{" "}
            <span className="fw-normal text-dark">{formatQuantity(spent)}</span>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default ExpensePanel;
