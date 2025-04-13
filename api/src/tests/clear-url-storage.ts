import { client } from '../infrastructure/pg';

export const clearUrlStorage = async () => {
  await client.query('DELETE FROM urls');
}
