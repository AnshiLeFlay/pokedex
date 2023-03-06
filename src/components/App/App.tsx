import React, { useEffect, useState } from "react";
import { List, Pagination, Select } from "antd";
import { getPokemons } from "../../services/actions";
import { useDispatch, useSelector } from "../../services/hooks";

import "./App.css";
import PokemonCard from "../PokemonCard/PokemonCard";
import Search from "antd/es/input/Search";

const App: React.FC = () => {
    const [pageSize, setPageSize] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pokemons = useSelector((store) => store.pokemons);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemons(100000, 0));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePageSize = (current: number, size: number) => {
        //dispatch(getPokemons(size, current * size - size));

        setCurrentPage(current);
        setPageSize(size);
    };

    const onSearch = (value: string) => {
        console.log(value);
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <>
            <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{ width: 200 }}
            />
            <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Tags Mode"
                onChange={handleChange}
                options={[]}
            />
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={pokemons?.results?.slice(currentPage*pageSize - pageSize, currentPage*pageSize)}
                renderItem={(item: any) => {
                    //можно оптимизировать
                    const buffer = item.url.split("/");
                    return (
                        <List.Item>
                            <PokemonCard id={buffer[buffer.length - 2]} />
                        </List.Item>
                    );
                }}
            />

            <Pagination
                onChange={handlePageSize}
                defaultCurrent={1}
                total={pokemons?.count}
                pageSizeOptions={[10, 20, 50]}
            />
        </>
    );
};

export default App;