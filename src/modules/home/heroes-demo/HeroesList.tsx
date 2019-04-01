import * as React from "react";

import { Avatar } from "@kata-kit/avatar";
import { Button } from "@kata-kit/button";
import { DashboardCards } from "@kata-kit/dashboard";
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
} from "@kata-kit/drawer";
import { Card, CardButton } from "@kata-kit/card";

import { DataMap } from "~/interfaces/types";
import { Hero } from "~/interfaces/heroes";
import { Skeleton } from "../../../components/Skeleton";
import { fetchRequest } from "../../../stores/heroes/actions";
import { CardInfo, CardInfoKey, CardInfoValue } from "../components/CardInfo";

interface HeroesListProps {
  loading?: boolean;
  index: string[];
  data: DataMap<Hero>;
  fetchRequest: typeof fetchRequest;
}

interface HomeFirstPageState {
  open: boolean;
  hero: Hero;
}

const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "https://api.opendota.com";

class HeroesList extends React.Component<HeroesListProps, HomeFirstPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      open: false,
      hero: {
        id: 0,
        name: "",
        localized_name: "",
        primary_attr: "",
        attack_type: "",
        roles: [],
        img: "",
        icon: "",
        legs: 0
      }
    };
  }

  componentDidMount() {
    this.props.fetchRequest();
  }

  toggleDrawer(hero: Hero) {
    this.setState(prevState => ({
      open: !prevState.open,
      hero: hero
    }));
  }

  renderInner() {
    const style: React.CSSProperties = {
      position: "relative",
      overflow: "hidden",
      width: "100%",
      height: "100%",
      padding: "20px"
    };
    const image: React.CSSProperties = {
      borderRadius: "20px"
    };
    return (
      <>
        <DrawerHeader title={this.state.hero.localized_name} />
        <div style={style}>
          <div className="mb-2">
            <img
              src={API_ENDPOINT + this.state.hero.img}
              style={image}
              alt=""
            />
          </div>
          <div className="mb-2">
            {this.state.hero.attack_type} -{" "}
            <span>{this.state.hero.roles.join(", ")}</span>
          </div>
          <CardInfo>
            <CardInfoKey>Primary Attr</CardInfoKey>
            <CardInfoValue>{this.state.hero.primary_attr}</CardInfoValue>
          </CardInfo>
          <CardInfo>
            <CardInfoKey>Legs</CardInfoKey>
            <CardInfoValue>{this.state.hero.legs}</CardInfoValue>
          </CardInfo>
        </div>
        <DrawerFooter>
          <Button
            color="primary"
            onClick={() => this.toggleDrawer(this.state.hero)}
          >
            Close drawer
          </Button>
        </DrawerFooter>
      </>
    );
  }

  public render() {
    const { open } = this.state;

    return (
      <React.Fragment>
        <DashboardCards>
          {this.props.loading
            ? this.renderLoading()
            : this.props.index && this.props.index.length
            ? this.renderData()
            : null}
        </DashboardCards>

        <Drawer
          isOpen={open}
          onClose={() => this.toggleDrawer(this.state.hero)}
        >
          {this.renderInner()}
        </Drawer>
      </React.Fragment>
    );
  }

  private renderLoading() {
    return [...Array(3)].map((_, i) => (
      <Card key={i} title={<Skeleton /> as any}>
        <Skeleton numberOfLines={3} />
      </Card>
    ));
  }

  private renderData() {
    return this.props.index.map(name => {
      const hero = this.props.data[name];

      return (
        <Card
          onClick={() => this.toggleDrawer(hero)}
          key={hero.id}
          title={hero.localized_name}
          avatarComponent={<Avatar src={API_ENDPOINT + hero.img} size={40} />}
        >
          <div className="mb-2">
            {hero.attack_type} - <span>{hero.roles.join(", ")}</span>
          </div>
          <CardInfo>
            <CardInfoKey>Primary Attr</CardInfoKey>
            <CardInfoValue>{hero.primary_attr}</CardInfoValue>
          </CardInfo>
          <CardInfo>
            <CardInfoKey>Legs</CardInfoKey>
            <CardInfoValue>{hero.legs}</CardInfoValue>
          </CardInfo>
        </Card>
      );
    });
  }
}

export default HeroesList;
