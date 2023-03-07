import React, { useEffect } from "react";

import { useDispatch, useSelector } from "../../services/hooks";
import { getPokemon } from "../../services/actions";
import { Card, Col, Divider, Row } from "antd";

import styles from "./pokemoncard.module.css";

interface ICard {
    id: number;
}

const PokemonCard: React.FC<ICard> = (props) => {
    const pokemon = useSelector((store) =>
        store.data.find((elem) => elem.id.toString() === props.id.toString())
    );
    const tags = useSelector((store) => store.tags);
    const dispatch = useDispatch();

    useEffect(() => {
        if (pokemon === undefined) dispatch(getPokemon(props.id));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, props.id]);

    return (
        <Card
            title={`${pokemon?.name
                .charAt(0)
                .toUpperCase()}${pokemon?.name.slice(1)}`}
        >
            <div className={styles.card_avatar_wrapper}>
                <img
                    className={`${styles.pokemon_card_image}`}
                    alt={pokemon?.name}
                    src={pokemon?.avatar}
                />
            </div>
            <Divider />
            <div className={styles.card_tags_wrapper}>
                {pokemon?.types.map((elem: any) => (
                    <span
                        key={`${pokemon?.name}_${elem.type.name}`}
                        className={styles.card_tag}
                        style={{
                            backgroundColor: tags.find(
                                (tag) => tag.type === elem.type.name
                            )?.color,
                        }}
                    >
                        {elem.type.name}
                    </span>
                ))}
            </div>
            <Divider />
            <div className={styles.card_stats_wrapper}>
                <Row>
                    <Col span={8}>
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
                    <Col span={8}>
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
                    <Col span={8}>
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
                </Row>
                <Row>
                    <Col span={8}>
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
                    <Col span={8}>
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
                    <Col span={8}>
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
        </Card>
    );
};

export default PokemonCard;
/*
{pokemon?.stats.map((elem: any, index: number) => (
    <p key={`${props.id}_${index}`}>
        {elem.stat.name}<br/>{elem.base_stat}
    </p>
))}
*/
