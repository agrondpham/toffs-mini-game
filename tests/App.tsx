import * as React from 'react'
// import { LineMatch } from 'toffs-mini-games'
// import './App.css';
import 'reactflow/dist/style.css'
import LineMatch, { LineMatchRef } from '../src/components/line-match';
// import { LineMatchRef } from '../src/components/line-match/type/LineMatchType';
import ReorderComponent from '../src/components/reorder';


const LineMatchData = [
  {
    id: 'c348147a-10bf-41ac-9769-881fc4b6c518',
    content: 'If you could remove something that exists in this world forever, what would it be?',
    type: 'source'
  },
  {
    id: '2dd781fa-50e5-4c46-9b2f-618041db155f',
    content: 'If you could remove something that exists in this world forever, what would it be?',
    type: 'target'
  },
  {
    id: 'c917993b-0474-4d5d-b7ee-4375696cb916',
    content: 'If you could remove something that exists in this world forever, what would it be?',
    type: 'target'
  },
  {
    id: '26a058dc-4a02-4d3f-9546-bc4b43c1081a',
    content: 'If you could remove something that exists in this world forever, what would it be?',
    type: 'source'
  },
  {
    id: '7b65d393-e8e6-4c01-89bb-80e272b506f5',
    content: 'Question 5',
    type: 'source'
  },
  {
    id: 'f1bd7b28-b908-4233-89d1-856c98234362',
    content: 'Answer 6',
    type: 'target'
  },
]

const initialItems = [
  { id: 'f1bd7b28-b908-4233-89d1-856c98234362', content: 'Item 1' },
  { id: '7b65d393-e8e6-4c01-89bb-80e272b506f5', content: 'Item 2' },
  { id: '26a058dc-4a02-4d3f-9546-bc4b43c1081a', content: 'Item 3' },
  { id: 'c917993b-0474-4d5d-b7ee-4375696cb916', content: 'Item 4' },
  { id: 'c917993b-0474-4d5d-b7ee-4375696cb916', content: 'Item 5' },
  { id: 'c348147a-10bf-41ac-9769-881fc4b6c518', content: 'Item 6' },
]

function App() {
  const lineMatchRef = React.useRef<LineMatchRef>(null)

  return (
    <>
      <ReorderComponent data={initialItems} itemClassName='text-sm'/>
      <LineMatch ref={lineMatchRef} data={LineMatchData} flowClassName="text-sm"/>
      <button onClick={() => {
        lineMatchRef.current && lineMatchRef.current.exportToJson()
      }}>Export</button>

    </>

  );
}

export default App;
