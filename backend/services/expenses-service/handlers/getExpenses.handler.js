
export const getExpenses  = async (event) => {
  

  return {
    statusCode: 200,
    body: JSON.stringify("hello world",process.env.DYNAMODB_TABLE),
  };
};
