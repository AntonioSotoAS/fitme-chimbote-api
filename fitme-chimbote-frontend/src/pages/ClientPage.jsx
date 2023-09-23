import React, { useState } from "react";
import ClientForm from "../components/client/ClientForm";
import ClientEditModal from "../components/client/ClientEditModal";
import ClientViewModal from "../components/client/ClientViewModal";

function ClientPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);



  const openViewModal = () => {
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => {
    setIsViewModalOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(true);
  };


  return (
    <div>
      {isModalOpen && (
        <div className="modal">
          <ClientForm onClose={closeModal} />
        </div>
      )}

      {isViewModalOpen && (
        <div className="modal">
          <ClientViewModal onClose={closeViewModal} />
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal">
          <ClientEditModal onClose={closeEditModal} />
        </div>
      )}
    </div>
  );
}

export default ClientPage;
