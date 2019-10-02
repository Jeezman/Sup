import React, {ComponentType, Component, ElementType} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import withTheme, {ThemeInjectedProps} from '../contexts/theme/withTheme';
import px from '../utils/normalizePixel';
import {withNavigation, NavigationInjectedProps} from 'react-navigation';
import Touchable from './Touchable';

type ButtonsTypes = 'back' | 'menu';

type Props = ThemeInjectedProps &
  NavigationInjectedProps & {
    left?: ButtonsTypes | JSX.Element;
    center?: string | JSX.Element;
    right?: ButtonsTypes | JSX.Element;
    statusBarColor?: string;
    style?: ViewStyle;

    onBackPress?(): void;
  };

class Header extends Component<Props> {
  renderMenuButton() {
    let {theme} = this.props;
    return (
      <Touchable style={styles.button} onPress={() => {}}>
        <MaterialCommunityIcons
          name="menu"
          color={theme.foregroundColor}
          size={px(25)}
        />
      </Touchable>
    );
  }

  renderBackButton() {
    let {theme, navigation} = this.props;
    return (
      <Touchable
        style={styles.button}
        onPress={() =>
          this.props.onBackPress
            ? this.props.onBackPress()
            : navigation.goBack()
        }>
        <MaterialCommunityIcons
          name="arrow-left"
          color={theme.foregroundColor}
          size={px(22)}
        />
      </Touchable>
    );
  }

  renderEmptyButton() {
    return <View style={styles.button} />;
  }

  renderButton(type: 'menu' | 'back' | string) {
    if (type === 'menu') return this.renderMenuButton();
    if (type === 'back') return this.renderBackButton();
  }

  renderTitle(title: string) {
    let {theme} = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: px(15.5),
            fontWeight: 'bold',
            color: theme.foregroundColor,
          }}>
          {title}
        </Text>
      </View>
    );
  }

  renderLeft() {
    if (!this.props.left) return this.renderEmptyButton();
    if (typeof this.props.left === 'string') {
      return this.renderButton(this.props.left);
    }
    return this.props.left;
  }

  renderCenter() {
    if (!this.props.center) return this.renderEmptyButton();
    if (typeof this.props.center === 'string') {
      return this.renderTitle(this.props.center);
    }
    return this.props.center;
  }

  renderRight() {
    if (!this.props.right) return this.renderEmptyButton();
    if (typeof this.props.right === 'string') {
      return this.renderButton(this.props.right);
    }
    return this.props.right;
  }

  render() {
    let {theme} = this.props;
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.backgroundColor,
            borderColor: theme.backgroundColorLess2,
          },
          this.props.style,
        ]}>
        {this.renderLeft()}
        {this.renderCenter()}
        {this.renderRight()}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    height: px(55),
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: px(12.5),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    width: px(40),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withTheme(withNavigation(Header));
