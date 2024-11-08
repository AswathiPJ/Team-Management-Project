import React from 'react'
import { TopBar } from '../components/Dashboard/TopBar';

function TasksView() {
    return (
        <div className="bg-white rounded-lg pb-4 shadow">
          <TopBar />
            <h1>Tasks View</h1>
        </div>
      );
}

export default TasksView