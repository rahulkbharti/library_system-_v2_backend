class Base_Model{
    constructor(table_name) {
        this.table_name = table_name;
    }
    async create(data) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const query = `INSERT INTO ${this.table_name} (${keys.join(', ')}) VALUES (${values.map(() => '?').join(', ')})`;
        return this.db.runQuery(query, values);
    }
    async view(id) {
        const query = id
            ? `SELECT * FROM ${this.table_name} WHERE id = ?`
            : `SELECT * FROM ${this.table_name}`;
        const params = id ? [id] : [];
        return this.db.runQuery(query, params);
    }
    async update(id, data) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const setClause = keys.map(key => `${key} = ?`).join(', ');
        const query = `UPDATE ${this.table_name} SET ${setClause} WHERE id = ?`;
        return this.db.runQuery(query, [...values, id]);
    }
}
    