
import { useState } from "react";

import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

function Students() {
  const [refresh, setRefresh] = useState(false);

  const refreshStudents = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="space-y-8">

      <StudentForm
        refreshStudents={refreshStudents}
      />

      <StudentTable
        refresh={refresh}
      />

    </div>
  );
}

export default Students;