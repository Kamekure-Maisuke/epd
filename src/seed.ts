import { client } from "./db";

await client.exec(`
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS members CASCADE;

  CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS members (
      id SERIAL PRIMARY KEY,
      name VARCHAR(20) NOT NULL,
      birthplace VARCHAR(10),
      birth_date DATE,
      generation INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  INSERT INTO members (name, birthplace, birth_date, generation) VALUES
  ('白石麻衣', '東京都', '1992-08-20', 1),
  ('松村沙友理', '大阪府', '1992-08-27', 1),
  ('橋本奈々美', '北海道', '1993-02-20', 1);
`);
