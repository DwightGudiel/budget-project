import Expense from "./Expense";
import { Container } from "react-bootstrap";

function ListExpenses({
  expensesArray,
  setUpdatedExpenseObj,
  setOpenModal,
  deleteExpenses,
  filteredExpensesArray,
  filter,
}) {
  return (
    <Container className="my-5 p-3">
      {/*Si Filtro tiene algo significa que estamos listando a través del filtro de lo contrario estamos listando todos los gastos. */}
      {filter ? (
        <>
          <h3 className="text-center text-primary fs-2 fw-bold mb-5">
            {filteredExpensesArray.length > 0
              ? "Listado de Gastos"
              : "No Hay Gastos En Esta Categoría"}
          </h3>
          {filteredExpensesArray.map((expenseObj) => (
            <Expense
              // Props
              expenseObj={expenseObj}
              key={expenseObj.id}
              setUpdatedExpenseObj={setUpdatedExpenseObj}
              setOpenModal={setOpenModal}
              deleteExpenses={deleteExpenses}
            />
          ))}
        </>
      ) : (
        <>
          <h3 className="text-center text-primary fs-3 fw-bold mb-5">
            {expensesArray.length > 0
              ? "Listado de Gastos"
              : "No Hay Gastos Aún"}
          </h3>
          {expensesArray.map((expenseObj) => (
            <Expense
              // Props
              expenseObj={expenseObj}
              key={expenseObj.id}
              setUpdatedExpenseObj={setUpdatedExpenseObj}
              setOpenModal={setOpenModal}
              deleteExpenses={deleteExpenses}
            />
          ))}
        </>
      )}
    </Container>
  );
}

export default ListExpenses;
