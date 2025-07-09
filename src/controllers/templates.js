import Model from "../../models/path_to_model.js";

const Controller = {
  add: async (req, res) => {
    try {
      const data = req.body;
      const result = await Model.add(data);
      
      if (result.error) {
        return res.status(400).json({ 
          success: false,
          error: result.error 
        });
      }

      return res.status(201).json({
        success: true,
        message: "Record created successfully",
        data: result
      });

    } catch (error) {
      console.error("Add Error:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error"
      });
    }
  },

  view: async (req, res) => {
    try {
      const id = req.query.id;
      const result = await Model.view(id);

      if (result.error) {
        return res.status(404).json({
          success: false,
          error: result.error
        });
      }

      if (!result || result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No records found"
        });
      }

      return res.status(200).json({
        success: true,
        data: id ? result[0] : result
      });

    } catch (error) {
      console.error("View Error:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error"
      });
    }
  },

  update: async (req, res) => {
    try {
      const data = { ...req.body, id: req.query.id };

      if (!data.id) {
        return res.status(400).json({
          success: false,
          error: "ID is required for update"
        });
      }

      const result = await Model.update(data);

      if (result.error) {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: "Record not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Record updated successfully",
        data: result
      });

    } catch (error) {
      console.error("Update Error:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error"
      });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.query.id;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: "ID is required for deletion"
        });
      }

      const result = await Model.delete(id);

      if (result.error) {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: "Record not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Record deleted successfully",
        id: id
      });

    } catch (error) {
      console.error("Delete Error:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error"
      });
    }
  }
};

export default Controller;