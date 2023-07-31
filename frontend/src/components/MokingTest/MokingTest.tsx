import React, { useState } from 'react';

interface StudyData {
  id: number;
  name: string;
  email: string;
}

const MockingTest: React.FC = () => {
  const [studyData, setStudyData] = useState<StudyData[] | null>(null);

  const handleClick3 = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((json: StudyData[]) => {
        setStudyData(json);
      })
      .catch((error) => {
        console.error(`Something Wrong: ${error}`);
      });
  };

  return (
    <div>
      <button onClick={handleClick3}> study 데이터 가져오기</button>
      {studyData && (
        <ul>
          {studyData.map((data) => (
            <p key={data.id}>
              {data.name} : {data.email}
            </p>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MockingTest;
