import API from "../utils/axios";

export const adminKycService = {
  /**
   * Get all KYC submissions with pagination and filters
   * @param {Object} params - { page, limit, status, search }
   */
  getSubmissions: async (params = {}) => {
    try {
      const response = await API.get("/admin/kyc/submissions", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching KYC submissions:", error.message);
      throw error;
    }
  },

  /**
   * Get a single KYC submission by ID
   */
  getSubmission: async (id) => {
    try {
      const response = await API.get(`/admin/kyc/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching KYC submission:", error.message);
      throw error;
    }
  },

  /**
   * Approve a KYC submission
   */
  approveKYC: async (id) => {
    try {
      const response = await API.post(`/admin/kyc/${id}/approve`);
      return response.data;
    } catch (error) {
      console.error("Error approving KYC:", error.message);
      throw error;
    }
  },

  /**
   * Reject a KYC submission with a reason
   */
  rejectKYC: async (id, reason) => {
    try {
      const response = await API.post(`/admin/kyc/${id}/reject`, { reason });
      return response.data;
    } catch (error) {
      console.error("Error rejecting KYC:", error.message);
      throw error;
    }
  },

  /**
   * Get KYC status for a specific user (optional)
   */
  getUserKYCStatus: async (userId) => {
    try {
      const response = await API.get(`/admin/kyc/user/${userId}/status`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user KYC status:", error.message);
      throw error;
    }
  },
};