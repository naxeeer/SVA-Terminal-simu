// Mock data for the SVA terminal simulation

export const students = [
  {
    id: "STU001",
    name: "John Doe",
    class: "Computer Science 400L",
    department: "Computer Science",
    faculty: "Faculty of Science",
    registeredCourses: ["CSC401", "CSC402", "CSC403", "CSC404", "CSC405"],
    faceId: "face_001",
    fingerprintId: "fp_001",
    profileImage: "/api/placeholder/150/150"
  },
  {
    id: "STU002",
    name: "Jane Smith",
    class: "Computer Science 300L",
    department: "Computer Science",
    faculty: "Faculty of Science",
    registeredCourses: ["CSC301", "CSC302", "CSC303", "CSC304"],
    faceId: "face_002",
    fingerprintId: "fp_002",
    profileImage: "/api/placeholder/150/150"
  },
  {
    id: "STU003",
    name: "Michael Johnson",
    class: "Computer Science 400L",
    department: "Computer Science",
    faculty: "Faculty of Science",
    registeredCourses: ["CSC401", "CSC403", "CSC405", "CSC406"],
    faceId: "face_003",
    fingerprintId: "fp_003",
    profileImage: "/api/placeholder/150/150"
  },
  {
    id: "STU004",
    name: "Sarah Williams",
    class: "Information Technology 300L",
    department: "Information Technology",
    faculty: "Faculty of Science",
    registeredCourses: ["IT301", "IT302", "IT303", "CSC401"],
    faceId: "face_004",
    fingerprintId: "fp_004",
    profileImage: "/api/placeholder/150/150"
  },
  {
    id: "STU005",
    name: "David Brown",
    class: "Computer Science 200L",
    department: "Computer Science",
    faculty: "Faculty of Science",
    registeredCourses: ["CSC201", "CSC202", "CSC203", "MTH201"],
    faceId: "face_005",
    fingerprintId: "fp_005",
    profileImage: "/api/placeholder/150/150"
  }
];

export const currentExam = {
  courseCode: "CSC401",
  courseName: "Advanced Database Systems",
  examDate: "2024-07-19",
  examTime: "09:00 AM",
  duration: "3 hours",
  venue: "Computer Lab A"
};

export const examSchedule = [
  {
    courseCode: "CSC401",
    courseName: "Advanced Database Systems",
    examDate: "2024-07-19",
    examTime: "09:00 AM"
  },
  {
    courseCode: "CSC402",
    courseName: "Software Engineering",
    examDate: "2024-07-20",
    examTime: "02:00 PM"
  },
  {
    courseCode: "CSC403",
    courseName: "Computer Networks",
    examDate: "2024-07-21",
    examTime: "09:00 AM"
  }
];

// Simulate face recognition results
export const simulateFaceRecognition = (delay = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly select a student or return null for unrecognized face
      const randomIndex = Math.floor(Math.random() * (students.length + 1));
      if (randomIndex < students.length) {
        resolve(students[randomIndex]);
      } else {
        resolve(null); // Unrecognized face
      }
    }, delay);
  });
};

// Simulate fingerprint verification
export const simulateFingerprintVerification = (studentId, delay = 1500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 90% success rate for demonstration
      const success = Math.random() > 0.1;
      resolve(success);
    }, delay);
  });
};

