import { DataLoader, DataLoaderProps } from './DataLoader';
import GeoJsonParser from 'geostyler-geojson-parser';
import WfsParser from 'geostyler-wfs-parser';
import TestUtil from '../../../Util/TestUtil';
import { shallow } from 'enzyme';
import { UploadButton } from '../../../Component/UploadButton/UploadButton';
import { Modal } from 'antd';

describe('DataLoader', () => {
  let wrapper: any;
  let dummyOnDataRead: jest.Mock;
  beforeEach(() => {
    dummyOnDataRead = jest.fn();
    const props: DataLoaderProps = {
      parsers: [
        GeoJsonParser,
        WfsParser
      ],
      onDataRead: dummyOnDataRead
    };
    wrapper = TestUtil.shallowRenderComponent(DataLoader, props);
  });

  it('is defined', () => {
    expect(DataLoader).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('parseUploadData', () => {
    it('returns undefined when no active parser is set', () => {
      const parseUploadData = wrapper.instance().parseUploadData;
      const got = parseUploadData();
      expect(parseUploadData).not.toThrow();
      expect(got).toBeUndefined();
    });
    // TODO
    // it('calls the passed onDataRead method with the read data', () => {
    //   expect.assertions(1);
    //   const file = new File(['{type:FeatureCollection,features:[{type:Feature,' +
    //     'properties:{name:Peter},geometry:{type:Point,coordinates:[43.59375,56.' +
    //     '9449741808516]}}]}'], 'test.geojson', {
    //       type: 'text/plain',
    //     });
    //   const fileObject = { file };
    //   wrapper.setState({
    //     activeParser: GeoJsonParser
    //   });
    //   const parseUploadData = wrapper.instance().parseUploadData;
    //   parseUploadData(fileObject);
    //   expect(dummyOnDataRead).toBeCalled();
    // });
  });

  describe('parseWfsData', () => {
    it('returns undefined when no active parser is set', () => {
      const parseWfsData = wrapper.instance().parseWfsData;
      const got = parseWfsData();
      expect(parseWfsData).not.toThrow();
      expect(got).toBeUndefined();
    });
    // TODO
    // it('calls the passed onDataRead method with the read data', () => {
    //   expect.assertions(1);
    //   const wfsParams = {
    //     url: 'https://ows.terrestris.de/geoserver/terrestris/ows',
    //     version: '1.1.0',
    //     typeName: 'terrestris:bundeslaender',
    //     maxFeatures: 10
    //   };
    //   wrapper.setState({
    //     activeParser: WfsParser
    //   });
    //   const parseUploadData = wrapper.instance().parseUploadData;
    //   parseUploadData(wfsParams);
    //   expect(dummyOnDataRead).toBeCalled();
    // });
  });

  describe('getParserOptions', () => {
    it('returns a Select.Option for every passed parser', () => {
      const getParserOptions = wrapper.instance().getParserOptions;
      const gots = getParserOptions();
      gots.forEach((got: any, index: number) => {
        expect(got.type.name).toBe('Option');
      });
    });
  });

  describe('onSelect', () => {
    it('sets the select parser as active parser', () => {
      const onSelect = wrapper.instance().onSelect;
      onSelect(GeoJsonParser.title);
      const activeParser = wrapper.state().activeParser;
      expect(activeParser).toBe(GeoJsonParser);

    });
    it('sets modalVisible to true for WFS Data Parser', () => {
      const onSelect = wrapper.instance().onSelect;
      onSelect(WfsParser.title);
      const activeParser = wrapper.state().activeParser;
      const modalVisible = wrapper.state().modalVisible;
      expect(activeParser).toBe(WfsParser);
      expect(modalVisible).toBe(true);
    });
  });

  describe('closeModal', () => {
    it('sets modalVisible to false', () => {
      wrapper.instance().closeModal();
      const modalVisible = wrapper.state().modalVisible;
      expect(modalVisible).toBe(false);
    });
  });

  describe('getInputFromParser', () => {
    it('returns null if no activeParser is set', () => {
      const getInputFromParser = wrapper.instance().getInputFromParser;
      const got = getInputFromParser();
      expect(got).toBeNull();
    });
    it('returns an UploadButton if activeParser is "GeoJSON Style Parser"', () => {
      wrapper.setState({
        activeParser: GeoJsonParser
      });
      const getInputFromParser = wrapper.instance().getInputFromParser;
      const got = getInputFromParser();
      const instance = shallow(got).instance();
      expect(instance).toBeInstanceOf(UploadButton);
    });
    it('returns a Modal if activeParser is "WFS Data Parser"', () => {
      wrapper.setState({
        activeParser: WfsParser
      });
      const getInputFromParser = wrapper.instance().getInputFromParser;
      const got = getInputFromParser();
      const instance = shallow(got).instance();
      expect(instance).toBeInstanceOf(Modal);
    });
    it('returns an UploadButton if activeParser is something else', () => {
      wrapper.setState({
        activeParser: 'PetersParser'
      });
      const getInputFromParser = wrapper.instance().getInputFromParser;
      const got = getInputFromParser();
      const instance = shallow(got).instance();
      expect(instance).toBeInstanceOf(UploadButton);
    });
  });
});
