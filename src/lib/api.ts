const API_KEY =
  'd8c6f1edefbc0711e6d658bc4401cabc68dfb7f42c109210a782594ad6eb8a02';

export const performScan = async (tabUrl: string) => {
  const apiUrl = `https://www.virustotal.com/vtapi/v2/url/scan`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      apikey: API_KEY,
      url: tabUrl,
    }),
  };

  const response = await fetch(apiUrl, options);

  if (!response.ok) {
    throw new Error('Failed to scan the website');
  }

  return await response.json();
};

export const getReport = async (scanId: string) => {
  const res = await fetch(
    `https://www.virustotal.com/vtapi/v2/url/report?apikey=${API_KEY}&resource=${scanId}`,
    {
      method: 'GET',
      headers: {
        'x-apikey': API_KEY,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return await res.json();
};
