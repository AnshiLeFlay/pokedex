import React, { useEffect, useState } from "react";
import { List, Pagination, Select, Space } from "antd";
import { getPokemons, getPokemonsByType } from "../../services/actions";
import { useDispatch, useSelector } from "../../services/hooks";

import styles from "./app.module.css";
import PokemonCard from "../PokemonCard/PokemonCard";
import Search from "antd/es/input/Search";
import { CLEAR_SEARCH } from "../../services/constants";

const { Option } = Select;

const App: React.FC = () => {
    //filtered array with tags and/or search value
    const [searchedValue, setSearchedValue] = useState<Array<any>>([]);
    //tags search array
    const searchByTags = useSelector((store) => store.search);
    //search string
    const [needle, setNeedle] = useState<string>("");
    //search flag
    const [sFlag, setSFlag] = useState<boolean>(false);

    //pagination values
    const [pageSize, setPageSize] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    //all pokemons
    const pokemons = useSelector((store) => store.pokemons);
    //pokemons types
    const tags = useSelector((store) => store.tags);

    //common
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemons(100000, 0));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (needle === "" && searchByTags.status === false) {
            setSearchedValue([]);
            setSFlag(false);
            return;
        }

        setSFlag(true);

        if (needle === "") {
            if (
                searchByTags.buffer.length !== 0 &&
                searchByTags.status === true
            ) {
                setSearchedValue(searchByTags.buffer);

                setCurrentPage(1);
            }
        } else {
            let filteredNeedle;
            if (
                searchByTags.buffer.length !== 0 &&
                searchByTags.status === true
            ) {
                filteredNeedle = searchByTags.buffer.filter((elem: any) =>
                    elem.name.includes(needle.toLowerCase())
                );
            } else {
                filteredNeedle = pokemons?.results?.filter((elem: any) =>
                    elem.name.includes(needle.toLowerCase())
                );
            }

            setSearchedValue(filteredNeedle);

            setCurrentPage(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchByTags.buffer, searchByTags.status, needle]);

    const handlePageSize = (current: number, size: number) => {
        setCurrentPage(current);
        setPageSize(size);
    };

    const onSearch = (value: string) => {
        if (value !== "") {
            setNeedle(value);
        } else {
            setNeedle("");
        }
    };

    const handleChange = (tags: Array<string>) => {
        dispatch({ type: CLEAR_SEARCH });

        if (tags.length > 0) {
            dispatch(getPokemonsByType(tags));
        }
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
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="select types"
                onChange={handleChange}
                optionLabelProp="label"
            >
                {tags.map((elem: any) => (
                    <Option
                        key={`${elem.type}`}
                        value={elem.type}
                        label={elem.type}
                    >
                        <Space>
                            <span
                                className={styles.tag}
                                style={{ backgroundColor: elem.color }}
                                aria-label={elem.type}
                            >
                                {elem.type}
                            </span>
                        </Space>
                    </Option>
                ))}
            </Select>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 5,
                    xxl: 3,
                }}
                dataSource={
                    //searchedValue.length === 0
                    !sFlag
                        ? pokemons?.results?.slice(
                              currentPage * pageSize - pageSize,
                              currentPage * pageSize
                          )
                        : searchedValue.slice(
                              currentPage * pageSize - pageSize,
                              currentPage * pageSize
                          )
                }
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
                current={currentPage}
                total={
                    //searchedValue.length > 0
                    sFlag
                        ? searchedValue.length
                        : pokemons?.count
                }
                pageSizeOptions={[10, 20, 50]}
            />
        </>
    );
};

export default App;
