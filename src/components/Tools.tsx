import React, { useState } from 'react'
import { Tool, Lock, Hash, Wifi, FileSearch, AlertTriangle } from 'lucide-react'

const Tools: React.FC = () => {
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('')
  const [plaintext, setPlaintext] = useState('')
  const [hashedText, setHashedText] = useState('')
  const [ipAddress, setIpAddress] = useState('')
  const [portScanResult, setPortScanResult] = useState('')
  const [fileContent, setFileContent] = useState('')
  const [malwareDetectionResult, setMalwareDetectionResult] = useState('')

  const checkPasswordStrength = (pwd: string) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})")
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})")
    
    if (strongRegex.test(pwd)) {
      setPasswordStrength('Strong')
    } else if (mediumRegex.test(pwd)) {
      setPasswordStrength('Medium')
    } else {
      setPasswordStrength('Weak')
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    checkPasswordStrength(e.target.value)
  }

  const hashText = () => {
    // In a real-world scenario, use a proper cryptographic hash function
    const hashedValue = btoa(plaintext)
    setHashedText(hashedValue)
  }

  const simulatePortScan = () => {
    // This is a simulated port scan. In a real scenario, this would be done server-side.
    const openPorts = [80, 443, 22, 21]
    const closedPorts = [8080, 3306, 5432]
    const result = `Open ports: ${openPorts.join(', ')}\nClosed ports: ${closedPorts.join(', ')}`
    setPortScanResult(result)
  }

  const simulateMalwareDetection = () => {
    // This is a simulated malware detection. In a real scenario, this would use actual malware detection algorithms.
    const detectionResult = Math.random() > 0.5 ? 
      "No malware detected. File appears to be clean." : 
      "Warning: Potential malware detected. Further analysis recommended."
    setMalwareDetectionResult(detectionResult)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="cyberpunk-card p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Lock className="mr-2" /> Password Strength Checker
        </h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full p-2 mb-2 bg-gray-800 text-green-500 border border-green-500 rounded"
        />
        <p>Strength: <span className={`font-bold ${
          passwordStrength === 'Strong' ? 'text-green-500' :
          passwordStrength === 'Medium' ? 'text-yellow-500' :
          'text-red-500'
        }`}>{passwordStrength}</span></p>
        {passwordStrength && (
          <ul className="mt-2 text-sm">
            <li>✓ At least 12 characters long</li>
            <li>✓ Contains uppercase and lowercase letters</li>
            <li>✓ Contains numbers</li>
            <li>✓ Contains special characters</li>
          </ul>
        )}
      </div>

      <div className="cyberpunk-card p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Hash className="mr-2" /> Text Hasher
        </h2>
        <input
          type="text"
          placeholder="Enter text to hash"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-800 text-green-500 border border-green-500 rounded"
        />
        <button onClick={hashText} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 mb-2">
          Hash Text
        </button>
        {hashedText && (
          <div>
            <p className="font-bold">Hashed Text:</p>
            <p className="break-all bg-gray-700 p-2 rounded">{hashedText}</p>
          </div>
        )}
      </div>

      <div className="cyberpunk-card p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Wifi className="mr-2" /> Port Scanner
        </h2>
        <input
          type="text"
          placeholder="Enter IP address"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-800 text-green-500 border border-green-500 rounded"
        />
        <button onClick={simulatePortScan} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 mb-2">
          Scan Ports
        </button>
        {portScanResult && (
          <div>
            <p className="font-bold">Scan Results:</p>
            <pre className="bg-gray-700 p-2 rounded whitespace-pre-wrap">{portScanResult}</pre>
          </div>
        )}
      </div>

      <div className="cyberpunk-card p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <AlertTriangle className="mr-2" /> Malware Detection
        </h2>
        <textarea
          placeholder="Paste file content for analysis"
          value={fileContent}
          onChange={(e) => setFileContent(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-800 text-green-500 border border-green-500 rounded"
          rows={4}
        />
        <button onClick={simulateMalwareDetection} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 mb-2">
          Analyze for Malware
        </button>
        {malwareDetectionResult && (
          <div>
            <p className="font-bold">Analysis Result:</p>
            <p className={`p-2 rounded ${malwareDetectionResult.includes('No malware') ? 'bg-green-700' : 'bg-red-700'}`}>
              {malwareDetectionResult}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tools