import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';
import TrainerProfile from '../components/TrainerSmallProfile'
import '../css/trainers.css'

const Trainers = ({ setUserData }) => {

  const navigate = useNavigate();
  //OH YEA I WOULD WANT MYSELF

  //BABY PLEASE BELIEVE ME


  const userData = useContext(UserContext);
  const [trainers, setTrainers] = useState(null);
  const [addTrainer, setAddTrainer] = useState(false);
  // const [sortBy, setSortBy] = useState('sequential');
  // const [searchBy, setSearchBy] = useState('');
  // let returnMassege = "";


  useEffect(() => {

    const url = `trainers`;

    serverRequests('GET', url, null)
      .then(response => {
        console.log(response);
        if (!response.ok) {
          return;
        }
        return response.json();
      }).then(data => {
        if (data) {
          setTrainers(data.trainers);
        }
      }).catch(error => {
        console.error('Error', error);
      });
  }, []);

  if (!trainers)
    return <div className="loader">
      <div className="wrapper">
        <div className="circle"></div>
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-3"></div>
        <div className="line-4"></div>
      </div>
    </div>;

  if (trainers.length === 0)
    returnMassege = <h1>No trainers found.</h1>


  const handleAddTrainer = () => {

    setUserData(
      {
        user_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        birth_date: "",
        gender: "",
        degree_link: "",
        experience: "",
        last_work_place: "",
        diploma: "",
        specialization: "",
        instegram_link: "",
        facebook_link: "",
        twitter_link: ""
      }
    )
    navigate('/trainer-registeration')
  }

  // const handleSortChange = (event) => {
  //   setSortBy(event.target.value);
  // };

  // const handleSearchChange = (event) => {
  //   setSearchBy(event.target.value);
  // };


  // const sortedAndFilteredTodos = () => {
  //   let filteredTodos;

  //   if (searchBy != null) {
  //     filteredTodos = todos.filter(todo =>
  //       (searchBy == "completed" && !!todo.completed === searchCheckbox) ||
  //       (searchBy != "completed" &&
  //         todo.title.toLowerCase().includes(searchBy.toLowerCase()) ||
  //         todo.todo_id.toString().includes(searchBy))
  //     );
  //   }


  //   switch (sortBy) {
  //     case 'completed':
  //       return filteredTodos.sort((a, b) => a.completed - b.completed);
  //     case 'sequential':
  //       return filteredTodos.sort((a, b) => a.id - b.id);
  //     case 'alphabetical':
  //       return filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
  //     case 'random':
  //       return filteredTodos.sort(() => Math.random() - 0.5);
  //     default:
  //       return filteredTodos;
  //   }
  // };


  return (
    // <div className='todos'>
    //   <h1>Todos</h1>
    //   {returnMassege}
    //   <div className='search'>
    //     <label htmlFor="sort">Sort by: </label>
    //     <select
    //       id="sort"
    //       value={sortBy}
    //       onChange={handleSortChange}>
    //       <option value="sequential">Sequential</option>
    //       <option value="completed">Completed</option>
    //       <option value="alphabetical">Alphabetical</option>
    //       <option value="random">Random</option>
    //     </select>
    //     <br />
    //     <br />
    //     <label htmlFor="search">Search: </label>
    //     <input
    //       type="text"
    //       id="search"
    //       value={searchBy}
    //       onChange={handleSearchChange}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="searchCheckbox">
    //       Completed
    //       <input
    //         id="checkbox"
    //         type="checkbox"
    //         checked={searchCheckbox}
    //         name="searchCheckbox"
    //         onChange={handleSearchCheckboxChange}
    //       />
    //     </label></div>
    //   {addTodo ? (
    //     <div className='addTodo'>
    //       <input
    //         className='todoInput'
    //         type="text"
    //         value={newTodo.title}
    //         onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
    //         placeholder="Todo title"
    //       />
    //       <button className="btn" onClick={addTodoClicked}>Save Todo</button>
    //       <button className="btn" onClick={cancleAddTodo}>Cancel</button>
    //     </div>
    //   ) : (
    //     
    //   )}
    <div>
      <div id='trainers'>
        {trainers.map((trainer) => (
          <div key={trainer.trainer_id}>
            {console.log('trainer: ', trainer)}
            <TrainerProfile trainer={trainer} />
          </div>
        ))}
      </div>
  

      <div tabIndex="0" className="plusButton" onClick={handleAddTrainer}>
        <svg className="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
          <g mask="url(#mask0_21_345)">
            <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
          </g>
        </svg>
      </div>
    </div>

  );
};

export default Trainers;
