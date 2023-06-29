import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

// Funciones de ayuda
import { formatDate } from "../helpers";
import { formatQuantity } from "../helpers";

// Iconos .svg
import savingIcon from "../img/icono_ahorro.svg";
import houseIcon from "../img/icono_casa.svg";
import foodIcon from "../img/icono_comida.svg";
import expensesIcon from "../img/icono_gastos.svg";
import leisureIcon from "../img/icono_ocio.svg";
import healthIcon from "../img/icono_salud.svg";
import subscriptionsIcon from "../img/icono_suscripciones.svg";

function Expense({
  expenseObj,
  setUpdatedExpenseObj,
  setOpenModal,
  deleteExpenses,
}) {
  // Destructurando el objeto expenseObj
  const { descriptionExpense, quantity, categories, date, id } = expenseObj;

  // Guardar la ruta de los iconos
  const categoryImgObj = {
    ahorro: savingIcon,
    comida: foodIcon,
    casa: houseIcon,
    gastos: expensesIcon,
    ocio: leisureIcon,
    salud: healthIcon,
    suscripciones: subscriptionsIcon,
  };

  // Editar un gasto
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          setUpdatedExpenseObj(expenseObj);
          setOpenModal(true);
        }}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  // Eliminar un gasto
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => deleteExpenses(id)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList className="mt-5 shadow rounded">
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="expense-container p-2 w-100 rounded">
          <div className="d-flex flex-column justify-content-center align-items-center my-3 my-md-0">
            <img src={categoryImgObj[categories]} alt={`Icono ${categories}`} />
          </div>
          <div className=" text-center text-md-start text-secondary ">
            <p className="fw-bold fs-2 text-capitalize">{categories}</p>
            <p className="fw-bold fs-3">
              Descripcion del Gasto:{" "}
              <span className="fw-normal text-capitalize">
                {descriptionExpense}
              </span>
            </p>
            <p className="fw-bold fs-3">
              Cantidad:{" "}
              <span className="fw-normal">
                {formatQuantity(Number(quantity))}
              </span>
            </p>
            <p className="fw-bold text-md-end me-md-4 fs-4">
              Añadido el {formatDate(date)}
            </p>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}

export default Expense;
