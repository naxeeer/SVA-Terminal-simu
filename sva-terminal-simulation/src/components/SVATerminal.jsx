import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Fingerprint, 
  CheckCircle, 
  XCircle, 
  User, 
  Clock, 
  MapPin,
  BookOpen,
  GraduationCap,
  Building,
  AlertTriangle
} from 'lucide-react';
import { 
  students, 
  currentExam, 
  simulateFaceRecognition, 
  simulateFingerprintVerification 
} from '../data/mockData';

const SVATerminal = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [scanProgress, setScanProgress] = useState(0);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Reset function to start over
  const resetTerminal = () => {
    setCurrentScreen('welcome');
    setScanProgress(0);
    setCurrentStudent(null);
    setVerificationStatus(null);
    setIsScanning(false);
    setErrorMessage('');
  };

  // Face scan simulation
  const startFaceScan = async () => {
    setCurrentScreen('faceScanning');
    setIsScanning(true);
    setScanProgress(0);

    // Animate progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    try {
      const recognizedStudent = await simulateFaceRecognition();
      setIsScanning(false);
      
      if (recognizedStudent) {
        setCurrentStudent(recognizedStudent);
        setCurrentScreen('studentInfo');
      } else {
        setErrorMessage('Face not recognized. Please try again or contact administrator.');
        setCurrentScreen('error');
      }
    } catch (error) {
      setIsScanning(false);
      setErrorMessage('Face scanning failed. Please try again.');
      setCurrentScreen('error');
    }
  };

  // Check course registration
  const checkCourseRegistration = () => {
    if (!currentStudent) return;

    const isRegistered = currentStudent.registeredCourses.includes(currentExam.courseCode);
    
    if (isRegistered) {
      setCurrentScreen('fingerprintPrompt');
    } else {
      setErrorMessage(`Student is not registered for ${currentExam.courseCode} - ${currentExam.courseName}`);
      setCurrentScreen('error');
    }
  };

  // Fingerprint scan simulation
  const startFingerprintScan = async () => {
    setCurrentScreen('fingerprintScanning');
    setIsScanning(true);
    setScanProgress(0);

    // Animate progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 7;
      });
    }, 100);

    try {
      const verified = await simulateFingerprintVerification(currentStudent.id);
      setIsScanning(false);
      
      if (verified) {
        setVerificationStatus('approved');
        setCurrentScreen('result');
      } else {
        setErrorMessage('Fingerprint verification failed. Please try again.');
        setCurrentScreen('error');
      }
    } catch (error) {
      setIsScanning(false);
      setErrorMessage('Fingerprint scanning failed. Please try again.');
      setCurrentScreen('error');
    }
  };

  // Auto-reset after successful verification
  useEffect(() => {
    if (verificationStatus === 'approved') {
      const timer = setTimeout(() => {
        resetTerminal();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [verificationStatus]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <GraduationCap className="w-24 h-24 mx-auto text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-800">
                Student Verification Assistant
              </h1>
              <p className="text-xl text-gray-600">
                Please position your face in front of the camera to begin verification
              </p>
            </div>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <BookOpen className="w-5 h-5" />
                  Current Examination
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-lg font-semibold">{currentExam.courseName}</div>
                <div className="text-sm text-gray-600">Course Code: {currentExam.courseCode}</div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {currentExam.examTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {currentExam.venue}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={startFaceScan}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              <Camera className="w-6 h-6 mr-2" />
              Start Face Verification
            </Button>
          </div>
        );

      case 'faceScanning':
        return (
          <div className="text-center space-y-8">
            <div className="relative">
              <div className="w-64 h-64 mx-auto border-4 border-blue-500 rounded-full flex items-center justify-center bg-blue-50">
                <Camera className={`w-32 h-32 text-blue-600 ${isScanning ? 'animate-pulse' : ''}`} />
              </div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Scanning Face...</h2>
              <p className="text-gray-600">Please look directly at the camera and remain still</p>
              <div className="w-full max-w-md mx-auto">
                <Progress value={scanProgress} className="h-3" />
                <p className="text-sm text-gray-500 mt-2">{scanProgress}% Complete</p>
              </div>
            </div>
          </div>
        );

      case 'studentInfo':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800">Student Identified</h2>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{currentStudent.name}</h3>
                      <p className="text-gray-600">Student ID: {currentStudent.id}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Class:</span>
                        <p className="text-gray-600">{currentStudent.class}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Department:</span>
                        <p className="text-gray-600">{currentStudent.department}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="font-semibold text-gray-700">Faculty:</span>
                        <p className="text-gray-600">{currentStudent.faculty}</p>
                      </div>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-700">Registered Courses:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {currentStudent.registeredCourses.map(course => (
                          <Badge 
                            key={course} 
                            variant={course === currentExam.courseCode ? "default" : "secondary"}
                            className={course === currentExam.courseCode ? "bg-green-600" : ""}
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                onClick={checkCourseRegistration}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              >
                Verify Course Registration
              </Button>
            </div>
          </div>
        );

      case 'fingerprintPrompt':
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">Course Registration Verified</h2>
              <p className="text-lg text-gray-600">
                {currentStudent.name} is registered for {currentExam.courseCode}
              </p>
            </div>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6 text-center">
                <Fingerprint className="w-16 h-16 mx-auto text-yellow-600 mb-4" />
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                  Fingerprint Verification Required
                </h3>
                <p className="text-yellow-700">
                  Please place your finger on the fingerprint scanner to complete verification
                </p>
              </CardContent>
            </Card>

            <Button 
              onClick={startFingerprintScan}
              size="lg"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3"
            >
              <Fingerprint className="w-6 h-6 mr-2" />
              Start Fingerprint Scan
            </Button>
          </div>
        );

      case 'fingerprintScanning':
        return (
          <div className="text-center space-y-8">
            <div className="relative">
              <div className="w-64 h-64 mx-auto border-4 border-yellow-500 rounded-lg flex items-center justify-center bg-yellow-50">
                <Fingerprint className={`w-32 h-32 text-yellow-600 ${isScanning ? 'animate-pulse' : ''}`} />
              </div>
              <div className="absolute inset-0 border-4 border-transparent border-t-yellow-500 rounded-lg animate-spin"></div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Scanning Fingerprint...</h2>
              <p className="text-gray-600">Keep your finger steady on the scanner</p>
              <div className="w-full max-w-md mx-auto">
                <Progress value={scanProgress} className="h-3" />
                <p className="text-sm text-gray-500 mt-2">{scanProgress}% Complete</p>
              </div>
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <CheckCircle className="w-24 h-24 mx-auto text-green-600" />
              <h2 className="text-3xl font-bold text-green-800">VERIFICATION APPROVED</h2>
              <p className="text-xl text-gray-600">
                {currentStudent.name} is authorized to take the examination
              </p>
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="text-lg font-semibold text-green-800">
                    {currentExam.courseName} ({currentExam.courseCode})
                  </div>
                  <div className="text-sm text-green-700">
                    Student: {currentStudent.name} ({currentStudent.id})
                  </div>
                  <div className="text-sm text-green-700">
                    Time: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-gray-500">
              Returning to main screen in 5 seconds...
            </p>

            <Button 
              onClick={resetTerminal}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Verify Next Student
            </Button>
          </div>
        );

      case 'error':
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <XCircle className="w-24 h-24 mx-auto text-red-600" />
              <h2 className="text-3xl font-bold text-red-800">VERIFICATION FAILED</h2>
              <p className="text-lg text-gray-600">{errorMessage}</p>
            </div>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-red-800">
                  <AlertTriangle className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-semibold">Action Required</div>
                    <div className="text-sm text-red-700">
                      Please contact the examination administrator for assistance
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-x-4">
              <Button 
                onClick={resetTerminal}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Try Again
              </Button>
              <Button 
                variant="outline"
                className="border-gray-400 text-gray-600"
              >
                Contact Administrator
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">University Examination Center</h1>
                <p className="text-sm text-gray-600">Student Verification Terminal</p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div>{new Date().toLocaleDateString()}</div>
              <div>{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 min-h-[600px] flex items-center justify-center">
          {renderScreen()}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>SVA Terminal v1.0 | Powered by Raspberry Pi 4</p>
        </div>
      </div>
    </div>
  );
};

export default SVATerminal;

