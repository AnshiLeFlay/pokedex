import React from "react";
import { useAppSelector as useSelector } from "./../../store/hooks";
import { Col, Divider, Row, Typography } from "antd";
import { toUpperCaseFirstLitter } from "../../utils/functions";

import styles from "./pokemoninfo.module.css";
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";

const { Title, Text } = Typography;

interface IPokemonInfo {
    id: number;
}

const PokemonInfo: React.FC<IPokemonInfo> = (props) => {
    const pokemon = useSelector((store) =>
        store.pokemon.data.find(
            (elem) => elem.id.toString() === props.id.toString()
        )
    );
    const tags = useSelector((store) => store.pokemon.tags);

    return (
        <>
            <Row>
                <Col span={24}>
                    <Title level={2}>
                        {toUpperCaseFirstLitter(pokemon?.name)}#{pokemon?.id}
                    </Title>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    {pokemon?.avatar === null ? (
                        <ImagePlaceholder />
                    ) : (
                        <img
                            className={`${styles.pokemon_info_image}`}
                            alt={pokemon?.name}
                            src={pokemon?.avatar}
                        />
                    )}
                </Col>
                <Col className={styles.pl_1} span={12}>
                    <Row>
                        <Col span={12}>
                            <Title level={4}>Height: {pokemon?.height}</Title>
                        </Col>
                        <Col span={12}>
                            <Title level={4}>Weight: {pokemon?.weight}</Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Title level={4}>Type</Title>
                            <div className={styles.tags_wrapper}>
                                {pokemon?.types.map(
                                    (elem: { type: { name: string } }) => (
                                        <span
                                            key={`${pokemon?.name}_${elem.type.name}`}
                                            className={styles.info_tag}
                                            style={{
                                                backgroundColor: tags.find(
                                                    (tag) =>
                                                        tag.type ===
                                                        elem.type.name
                                                )?.color,
                                            }}
                                        >
                                            {elem.type.name}
                                        </span>
                                    )
                                )}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Title level={4}>Abilities</Title>
                            {pokemon?.abilities.map(
                                (
                                    ability: { ability: { name: string } },
                                    index: number
                                ) => (
                                    <Text
                                        key={`${pokemon?.name}_${ability.ability.name}_${index}`}
                                        type="secondary"
                                    >
                                        {ability.ability.name}{" "}
                                    </Text>
                                )
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Divider />
            <div className={styles.info_stats_wrapper}>
                <Row>
                    <Col span={4}>
                        <span>HP</span>
                        <span>
                            {
                                pokemon?.stats.find(
                                    (stat: { stat: { name: string } }) =>
                                        stat.stat.name === "hp"
                                )?.base_stat
                            }
                        </span>
                    </Col>
                    <Col span={4}>
                        <span>ATK</span>
                        <span>
                            {
                                pokemon?.stats.find(
                                    (stat: { stat: { name: string } }) =>
                                        stat.stat.name === "attack"
                                )?.base_stat
                            }
                        </span>
                    </Col>
                    <Col span={4}>
                        <span>DEF</span>
                        <span>
                            {
                                pokemon?.stats.find(
                                    (stat: { stat: { name: string } }) =>
                                        stat.stat.name === "defense"
                                )?.base_stat
                            }
                        </span>
                    </Col>

                    <Col span={4}>
                        <span>SATK</span>
                        <span>
                            {
                                pokemon?.stats.find(
                                    (stat: { stat: { name: string } }) =>
                                        stat.stat.name === "special-attack"
                                )?.base_stat
                            }
                        </span>
                    </Col>
                    <Col span={4}>
                        <span>SDEF</span>
                        <span>
                            {
                                pokemon?.stats.find(
                                    (stat: { stat: { name: string } }) =>
                                        stat.stat.name === "special-defense"
                                )?.base_stat
                            }
                        </span>
                    </Col>
                    <Col span={4}>
                        <span>SPD</span>
                        <span>
                            {
                                pokemon?.stats.find(
                                    (stat: { stat: { name: string } }) =>
                                        stat.stat.name === "speed"
                                )?.base_stat
                            }
                        </span>
                    </Col>
                </Row>
            </div>
            <Divider />
        </>
    );
};

export default PokemonInfo;
