import React, { useState } from 'react';
import { Shield, Globe, Lock, Code, Server, Wifi, Cpu, Database, Smartphone, Cloud } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  attacks: string[];
  defenses: string[];
  tools: string[];
}

const categories: Category[] = [
  {
    id: 'web-security',
    title: 'Web Application Security',
    description: 'Protecting web applications from various attacks and vulnerabilities.',
    icon: <Globe className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />,
    attacks: ['SQL Injection', 'Cross-Site Scripting (XSS)', 'Cross-Site Request Forgery (CSRF)', 'Session Hijacking'],
    defenses: ['Input Validation', 'Parameterized Queries', 'Content Security Policy (CSP)', 'HTTPS Implementation'],
    tools: ['OWASP ZAP', 'Burp Suite', 'Acunetix', 'Netsparker']
  },
  {
    id: 'network-security',
    title: 'Network Security',
    description: 'Securing network infrastructure and preventing unauthorized access.',
    icon: <Wifi className="w-6 h-6 md:w-8 md:h-8 text-green-500" />,
    attacks: ['Man-in-the-Middle (MITM)', 'DDoS Attacks', 'Port Scanning', 'ARP Spoofing'],
    defenses: ['Firewalls', 'Intrusion Detection Systems (IDS)', 'Virtual Private Networks (VPN)', 'Network Segmentation'],
    tools: ['Wireshark', 'Nmap', 'Snort', 'Metasploit']
  },
  {
    id: 'cryptography',
    title: 'Cryptography',
    description: 'Securing communication and data through encryption techniques.',
    icon: <Lock className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />,
    attacks: ['Brute Force Attacks', 'Side-Channel Attacks', 'Man-in-the-Middle (MITM)', 'Birthday Attacks'],
    defenses: ['Strong Encryption Algorithms', 'Key Management', 'Digital Signatures', 'Secure Random Number Generation'],
    tools: ['OpenSSL', 'GnuPG', 'HashCat', 'CrypTool']
  },
  {
    id: 'reverse-engineering',
    title: 'Reverse Engineering',
    description: 'Analyzing and understanding the inner workings of software and systems.',
    icon: <Code className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />,
    attacks: ['Malware Analysis', 'Software Cracking', 'Firmware Analysis', 'Protocol Reverse Engineering'],
    defenses: ['Code Obfuscation', 'Anti-Debugging Techniques', 'Tamper Detection', 'Secure Boot'],
    tools: ['IDA Pro', 'Ghidra', 'OllyDbg', 'Radare2']
  },
  {
    id: 'malware-analysis',
    title: 'Malware Analysis',
    description: 'Studying malicious software to understand its behavior and develop countermeasures.',
    icon: <Cpu className="w-6 h-6 md:w-8 md:h-8 text-red-500" />,
    attacks: ['Viruses', 'Trojans', 'Ransomware', 'Rootkits'],
    defenses: ['Antivirus Software', 'Behavior Analysis', 'Sandboxing', 'Network Segmentation'],
    tools: ['Cuckoo Sandbox', 'IDA Pro', 'Volatility', 'Yara']
  },
  {
    id: 'mobile-security',
    title: 'Mobile Security',
    description: 'Securing mobile devices and applications from various threats.',
    icon: <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-indigo-500" />,
    attacks: ['App Repackaging', 'Jailbreaking/Rooting', 'SMS Phishing', 'Man-in-the-Disk Attacks'],
    defenses: ['App Code Obfuscation', 'Secure Data Storage', 'Certificate Pinning', 'Biometric Authentication'],
    tools: ['MobSF', 'Frida', 'Drozer', 'Apktool']
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security',
    description: 'Protecting data, applications, and infrastructure associated with cloud computing.',
    icon: <Cloud className="w-6 h-6 md:w-8 md:h-8 text-cyan-500" />,
    attacks: ['Data Breaches', 'Insecure APIs', 'Account Hijacking', 'Shared Technology Vulnerabilities'],
    defenses: ['Identity and Access Management (IAM)', 'Encryption', 'Security Groups', 'Compliance Monitoring'],
    tools: ['AWS Security Hub', 'Azure Security Center', 'Google Cloud Security Command Center', 'CloudSploit']
  },
  {
    id: 'iot-security',
    title: 'IoT Security',
    description: 'Securing Internet of Things devices and their ecosystems.',
    icon: <Server className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />,
    attacks: ['Device Hijacking', 'Data Interception', 'Firmware Manipulation', 'Botnet Recruitment'],
    defenses: ['Secure Boot', 'Device Authentication', 'Network Segmentation', 'Regular Firmware Updates'],
    tools: ['Shodan', 'Foren6', 'Wireshark', 'Nmap']
  },
];

const HackingCategories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-green-500">Hacking Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => setSelectedCategory(category)}
          >
            <div className="flex items-center justify-center mb-4">
              {category.icon}
            </div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-center text-green-400">{category.title}</h2>
            <p className="text-gray-400 text-xs md:text-sm text-center">{category.description}</p>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 p-6 md:p-8 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-500">{selectedCategory.title}</h2>
            <p className="text-gray-300 mb-6 text-sm md:text-base">{selectedCategory.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-red-400">Common Attacks</h3>
                <ul className="list-disc list-inside text-gray-300 text-sm">
                  {selectedCategory.attacks.map((attack, index) => (
                    <li key={index}>{attack}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-blue-400">Defense Strategies</h3>
                <ul className="list-disc list-inside text-gray-300 text-sm">
                  {selectedCategory.defenses.map((defense, index) => (
                    <li key={index}>{defense}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-yellow-400">Popular Tools</h3>
                <ul className="list-disc list-inside text-gray-300 text-sm">
                  {selectedCategory.tools.map((tool, index) => (
                    <li key={index}>{tool}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <button
              className="mt-6 md:mt-8 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300 text-sm md:text-base"
              onClick={() => setSelectedCategory(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackingCategories;