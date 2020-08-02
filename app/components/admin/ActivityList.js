import React from 'react';
import PropTypes from 'prop-types';
import Realm from 'realm';
import {ScrollView, StyleSheet} from 'react-native';
import AdminActivityCard from '../AdminActivityCard';
import Animated from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import _ from 'lodash';
import ActivitySchema, {ActivitySchemaKey} from '../../schemas/ActivitySchema';

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    overflow: 'visible',
  },
});

export default class ActivityList extends React.Component {
  state = {
    realm: null,
    activities: [],
  };

  componentDidMount() {
    Realm.open({schema: [ActivitySchema], deleteRealmIfMigrationNeeded: true})
      .then(realm => {
        this.setState({realm: realm});

        let activities = realm.objects(ActivitySchemaKey);

        console.log(activities.objectId);
        // activities.addListener((obj, changes) => {
        //   console.log(
        //     `${changes.changedProperties.length} properties has changed`,
        //     obj,
        //     changes,
        //   );
        // });

        activities.map(x => {
          console.log(x, x.title);
        });

        this.setState({activities});
      })
      .catch(err => console.log('Unable to open database', err));
  }

  componentWillUnmount() {
    this.state.realm.close();
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        {this.state.activities.map((x, i) => {
          console.log(x.objectId);
          return (
            <PanGestureHandler
              key={i}
              onGestureEvent={this.onGestureEvent}
              onHandlerStateChange={this.onGestureEvent}>
              <Animated.View>
                <AdminActivityCard title={x.title} duration={x.duration} />
              </Animated.View>
            </PanGestureHandler>
          );
        })}
        {/* <AdminActivityCard /> */}
      </ScrollView>
    );
  }
}

ActivityList.propTypes = {
  onGestureEvent: PropTypes.func.isRequired,
  // translationX: PropTypes.any.isRequired,
  // translationY: PropTypes.any.isRequired,
};
