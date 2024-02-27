import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from "@mui/material";

interface Comment {
  id: number;
  title: string;
  body: string;
}

const MyComponent: React.FC = () => {
  const apiPath = "https://jsonplaceholder.typicode.com/posts";
  const page_limit = 15;
  const totalCount = 100;
  const [data, setData] = useState<Comment[]>([]);
  console.log(data, "data");

  const getPosts = () => {
    let pageNo = Math.ceil(data.length / page_limit) + 1;

    const queryParam = "?_page=" + pageNo + "&_limit=" + page_limit;
    const finalUrl = apiPath + queryParam;

    fetch(finalUrl)
      .then((response) => response.json())
      .then((result: Comment[]) => setData([...data, ...result]))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    setTimeout(() => {
      getPosts();
    }, 3000);
  }, []);

  const fetchMoreData = () => {
    if (data.length <= totalCount) {
      getPosts();
    }
  };

  return (
    <div>
       <Box sx={{ flexGrow: 1, p: 3, paddingLeft: "100px" }}>
        <h2 >Dashboard </h2>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={data.length < totalCount}
        loader={<p>Loading...</p>}
      >
        <Box>
        <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell> Body</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.length > 0 &&
                data.map((item:any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.body}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
      </InfiniteScroll>
      </Box>
    </div>
    
  );
};

export default MyComponent;
