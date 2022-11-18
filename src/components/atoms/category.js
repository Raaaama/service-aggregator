import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors, Fonts } from '../../constants';

export class Category extends Component {
    render() {
        const {
            title,
        } = this.props
        return (
            <TouchableOpacity>
                <Text>
                    {title.toUpperCase()}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    category: {
      flex: 1,
      backgroundColor: '#202124',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });