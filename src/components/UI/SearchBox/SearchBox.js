import React from 'react';
import { Form } from 'react-bootstrap';
import './SearchBox.scss';

// const SearchBox = (props) => {
//   let { onClear, onSearch } = props



//   return (
//     <div className="searchboxMain">
//       <input type="text" class="searchBox" placeholder={props.placeholder} onChange={(e) => onSearch && onSearch(e.target.value)} />
//       <button className="close-icon" type="reset" onClick={() => onClear && onClear()}></button>
//     </div >
//   );
// }

const SearchBox = (props) => {
  let { placeholder, onSearch, onClear, value } = props
  return (
    <div className="searchboxMain">
      <form>
        <input type="text" name="focus" required className="searchInput" value={value} placeholder={placeholder} onChange={(e) => onSearch && onSearch(e.target.value)} />
        <button className="close-icon" type="reset" onClick={() => onClear && onClear()}></button>
        {props.children}
      </form>
    </div >
  );
}

export default SearchBox;
