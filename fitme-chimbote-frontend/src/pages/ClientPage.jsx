import React, { useState } from "react";
import ClientForm from "../components/client/ClientForm"; 

function ClientPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && (
        <div className="modal">
          <ClientForm onClose={closeModal} />
        </div>
      )}
    </div>
  );
}

export default ClientPage;
