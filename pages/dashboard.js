import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const { data: session } = useSession();
  const [emails, setEmails] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      axios.get('/api/emails').then((res) => setEmails(res.data));
    }
  }, [session]);

  const classifyEmails = async () => {
    setLoading(true);
    const openaiKey = localStorage.getItem('openaiKey');
    const res = await axios.post('/api/classify', { openaiKey, emails });
    setClassifications(res.data.classifications);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {session && (
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Your Emails</h1>
          <div className="flex justify-center mb-4">
            <button
              onClick={classifyEmails}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {loading ? 'Classifying...' : 'Classify Emails'}
            </button>
          </div>
          <ul className="space-y-4">
            {emails.map((email, index) => (
              <li key={email.id} className="bg-white p-4 rounded shadow-md">
                <p className="text-gray-700 mb-2">{email.snippet}</p>
                <p className="text-sm text-gray-500">
                  Classification:{' '}
                  <span className="font-semibold">
                    {classifications[index] || 'Pending'}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
