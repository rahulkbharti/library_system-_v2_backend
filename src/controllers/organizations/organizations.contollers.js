import OrganizationsModel from "../../models/organizations/orgnizations.models.js";

const OrganizationController = {
  add: async (req, res) => {
    const bookData = req.body;
    const result = await OrganizationsModel.create(bookData);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    return res
      .status(201)
      .json({ message: "Organization added successfully", book: result });
  },
  view: async (req, res) => {
    const created_by_admin = req.query.id;

    const result = await OrganizationsModel.view(created_by_admin);
    if (result.error) {
      return res.status(404).json({ error: result.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "No Organization found" });
    }
    // if(created_by_admin) return res.status(200).json({...result[0] });
    return res.status(200).json({ organizations: result });
  },
  update: async (req, res) => {
    const bookData = req.body;
    if (!bookData.organization_id) {
      return res
        .status(400)
        .json({ error: "Organization ID is required for update" });
    }
    const result = await OrganizationsModel.update(bookData);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Organization not found" });
    }
    return res
      .status(200)
      .json({ message: "Organization updated successfully", book: result });
  },
  delete: async (req, res) => {
    const organization_id = req.query.id;
    //  console.log("Book ID to delete:", organization_id);
    const result = await OrganizationsModel.delete(organization_id);
    if (result.error) {
      return res.status(500).json({ error: result.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Organization not found" });
    }
    return res
      .status(200)
      .json({ message: "Organization deleted successfully", organization_id });
  },
};

export default OrganizationController;
