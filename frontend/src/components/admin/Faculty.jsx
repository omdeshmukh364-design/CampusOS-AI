import { useEffect, useState } from "react";

import FacultyForm from "./FacultyForm";
import FacultyTable from "./FacultyTable";

import {
  getFaculty,
} from "../../services/facultyService";

function Faculty() {
  const [faculty, setFaculty] = useState([]);

  const loadFaculty = async () => {
    const data = await getFaculty();
    setFaculty(data);
  };

  useEffect(() => {
    loadFaculty();
  }, []);

  return (
    <div className="space-y-8">

      <FacultyForm
        refreshFaculty={loadFaculty}
      />

      <FacultyTable
        faculty={faculty}
        refreshFaculty={loadFaculty}
        onEdit={(faculty) => {
          console.log("Edit Faculty", faculty);
        }}
      />

    </div>
  );
}

export default Faculty;