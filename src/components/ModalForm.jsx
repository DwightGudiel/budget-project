import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { number, object } from "prop-types";

function ModalForm({
  setOpenModal,
  openModal,
  saveExpenses,
  updatedExpenseObj,
}) {
  const handleClose = () => setOpenModal(false);
  const [descriptionExpense, setDescriptionExpense] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState("");
  const [id, setId] = useState("");

  // Rellenar los campos del formulario con el registro que desea actualizar el usuario.
  useEffect(() => {
    if (Object.keys(updatedExpenseObj).length > 0) {
      setDescriptionExpense(updatedExpenseObj.descriptionExpense);
      setQuantity(updatedExpenseObj.quantity);
      setCategories(updatedExpenseObj.categories);
      setId(updatedExpenseObj.id);
    }
  }, [updatedExpenseObj]);

  // Añadir un nuevo registro
  const handleNewExpense = (e) => {
    e.preventDefault();

    // Validar
    if (Number(quantity) <= 0) {
      // Mostrar alerta
      Swal.fire({
        position: "center",
        icon: "error",
        title: "El campo Cantidad debe ser superior a 0",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // Validar
    if ([descriptionExpense, quantity, categories].includes("")) {
      // Mostrar alerta
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Todos los campos son obligatorios",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    /* Llamando a la función saveExpenses y pasando los valores del formulario como un objeto. */
    saveExpenses({ descriptionExpense, quantity, categories, id });

    // Reinicar los State
    setDescriptionExpense("");
    setQuantity("");
    setCategories("");
  };

  return (
    <>
      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNewExpense}>
            <legend className="text-center text-primary fw-bold fs-4 py-3">
              {updatedExpenseObj.id
                ? "Actualiza El Gasto"
                : "Añade Un Nuevo Gasto"}
            </legend>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-5">
                Descripción del Gasto
              </Form.Label>
              <Form.Control
                className="fs-5"
                value={descriptionExpense}
                onChange={(e) => setDescriptionExpense(e.target.value)}
                type="text"
                placeholder="Escriba la descripción del gasto"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-5">Cantidad</Form.Label>
              <Form.Control
                className="fs-5"
                value={quantity}
                min="0"
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                placeholder="Escriba la cantidad gastada"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-5">Categoría</Form.Label>
              <Form.Control
                className="fs-5"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                as="select"
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

            <Button
              variant="primary"
              className=" my-3 w-100 fs-5"
              type="submit"
            >
              {" "}
              Añadir Gasto
            </Button>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default ModalForm;
