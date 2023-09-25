import React, { useState } from "react";
import MembershipForm from "../components/membership/MembershipForm";
import TableMembership from "../components/membership/TableMembership";

function MembershipPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal">
          <MembershipForm onClose={closeModal} />
        </div>
      )}

      <TableMembership openMembershipForm={openModal} />
    </div>
  );
}

export default MembershipPage;
