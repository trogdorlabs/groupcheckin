import React, { useState } from "react";

const goals = [
  {
    id: 1,
    description: "Play Guitar (5-10min)",
    userId: 1
  },
  {
    id: 2,
    description: "Wake up by 9:30am",
    userId: 1
  },
  {
    id: 3,
    description: "8 Hours of Sleep",
    userId: 2
  },
  {
    id: 4,
    description: "Build X-Wing Squads",
    userId: 2
  }
];

const initialDays = [
  {
    day: new Date(2019, 4, 22),
    goalStatuses: {}
  },
  {
    day: new Date(2019, 4, 21),
    goalStatuses: {
      1: true,
      2: false,
      3: false
    }
  },
  {
    day: new Date(2019, 4, 20),
    goalStatuses: {}
  }
];

const Goal = ({ goal, myGoal, status, onSetStatus }) => (
  <div>
    <h2>{goal.description}</h2>
    {status !== undefined && <h3>{`${status}`}</h3>}
    {myGoal && (
      <div>
        <button type="button" onClick={() => onSetStatus(undefined)}>
          Clear
        </button>
        <button type="button" onClick={() => onSetStatus(true)}>
          Did It
        </button>
        <button type="button" onClick={() => onSetStatus(false)}>
          Didn't Do It
        </button>
      </div>
    )}
  </div>
);

const Home = () => {
  const [days, setDays] = useState(initialDays);

  const updateStatus = (goalId, dayIndex, status) => {
    const day = days[dayIndex];
    const newGoalStatuses = { ...day.goalStatuses, [goalId]: status };
    const newDay = { ...day, goalStatuses: newGoalStatuses };
    setDays(
      days.map((localDay, idx) => (idx === dayIndex ? newDay : localDay))
    );
  };

  return (
    <div>
      {days.map((day, index) => (
        <div>
          <h1>{day.day.toString()}</h1>
          {goals.map(goal => (
            <Goal
              goal={goal}
              status={day.goalStatuses[goal.id]}
              myGoal={goal.userId === 1}
              onSetStatus={status => updateStatus(goal.id, index, status)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
