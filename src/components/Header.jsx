import Budget from "./Budget";
import ExpensePanel from "./ExpensePanel";

function Header({
  budget,
  setBudget,
  isValidBudget,
  setIsValidBudget,
  expensesArray,
  setExpensesArray,
}) {
  return (
    <header className="mt-5">
      <h1 className="text-center text-primary">Planificador de Gastos</h1>

      {/*si isValidBudget = true, mostramos el componente ExpensePanel, en caso contrario mostramos el componente Budget.*/}
      {isValidBudget ? (
        <ExpensePanel
          // Props
          budget={budget}
          expensesArray={expensesArray}
          setExpensesArray={setExpensesArray}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      ) : (
        <Budget
          // Props
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      )}
    </header>
  );
}

export default Header;
