import db from "../config/databaseConnection";

const executeQuery = (query: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err: Error | null, results: any) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

export default executeQuery;
