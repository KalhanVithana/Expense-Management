import { ColumnsType } from "antd/es/table";
import { FilterSectionTable } from "../components/molecules/FilterSection/FilterSection";

interface RawExpense {
  [key: string]: any; 
}

interface CleanExpense {
  key: string;         
  description: string;
  notes?: string;
  amount: number;
  date: string;
  category: string;
  userId: string;
}

export function constructExpenseTable(rawExpenses: RawExpense[]) {

  const dataSource: CleanExpense[] = rawExpenses.map((exp) => ({
    key: exp._id,
    name:exp.expenseName ,
    notes: exp.notes,
    amount: exp.amount,
    date: new Date(exp.date).toISOString().split("T")[0], 
    category: exp.type ?? exp.category ?? "Uncategorized",
    userId: exp.userId,
  }));

    const handleSearch = (selectedKeys: string[], confirm: () => void) => {
      console.log("selectedKeys",selectedKeys);
      
    confirm();
  };

  const handleReset = (clearFilters?: () => void) => {
    if (clearFilters) clearFilters();
  };

  const searchConfig = {
    handleSearch,
    handleReset,
  };


  const columns: ColumnsType<CleanExpense> = [
      {
      title: "Expense",
      dataIndex: "name",
      key: "expenseName",
     
  onFilter: (value, record) => record.name === value,
     ...FilterSectionTable('name', searchConfig),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      render: (text) => text || "-",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
      
  ];

  console.log(columns,dataSource);
  
  return { columns, dataSource };
}
