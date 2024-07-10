import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';
import { IconButton } from 'src/components/Buttons/IconButton';
import { InfoBox } from 'src/components/Overlays/Info/InfoBox';
import { toKebabCase } from 'src/utils/toKebabCase';
import { BiodiversityChart } from './BiodiversityChart';
import { CarbonChart } from './CarbonChart';
import { TreeCoverChart } from './TreeCoverChart';
import { WaterChart } from './WaterChart';

const RestorLogo = () => (
  <svg width="30" height="18" viewBox="0 0 306 183" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
    <path fill="currentColor" d="M38.692 78.216h8.507c4.673 0 7.995.403 9.967 1.245 1.972.841 3.578 2.232 4.783 4.172s1.825 4.245 1.825 6.88c0 2.782-.657 5.124-2.008 6.991-1.314 1.867-3.322 3.294-6.024 4.246l10.004 18.812h-8.762l-9.493-17.934h-.73v17.934h-8.033V78.216zM46.76 94.76h2.519c2.556 0 4.308-.33 5.294-1.025s1.46-1.793 1.46-3.367c0-.915-.255-1.72-.73-2.415s-1.132-1.172-1.935-1.464-2.264-.44-4.418-.44h-2.19zm31.325-16.543h23.075v7.906H86.082v7.649h15.079v7.759H86.082v11.126h15.079v7.906H78.086V78.216Zm61.082 5.746-5.951 5.27c-2.081-2.927-4.235-4.391-6.389-4.391-1.059 0-1.935.292-2.593.841-.657.55-1.022 1.208-1.022 1.904 0 .695.256 1.39.73 2.013.658.841 2.629 2.671 5.915 5.453 3.067 2.562 4.929 4.209 5.586 4.867 1.643 1.648 2.775 3.221 3.469 4.722.693 1.5 1.022 3.147 1.022 4.941 0 3.477-1.205 6.331-3.578 8.601-2.41 2.269-5.513 3.403-9.383 3.403-2.994 0-5.623-.732-7.85-2.232-2.227-1.464-4.162-3.807-5.732-6.954l6.754-4.099q3.067 5.6 7.01 5.599c1.388 0 2.556-.402 3.469-1.207.949-.805 1.424-1.72 1.424-2.782 0-.951-.365-1.903-1.059-2.891-.694-.952-2.264-2.416-4.674-4.392-4.6-3.77-7.594-6.661-8.908-8.71-1.351-2.05-2.008-4.1-2.008-6.113 0-2.928 1.132-5.453 3.359-7.54 2.227-2.085 5.002-3.147 8.251-3.147 2.118 0 4.126.476 6.024 1.464 1.826.988 3.907 2.782 6.134 5.38m10.113-5.746h23.367v7.942h-7.704v34.404h-8.141V86.158h-7.485v-7.942zm53.999-1.098c5.988 0 11.099 2.16 15.407 6.515 4.309 4.355 6.463 9.626 6.463 15.847q0 9.278-6.353 15.701c-4.235 4.283-9.383 6.405-15.444 6.405-6.353 0-11.61-2.196-15.809-6.588s-6.28-9.625-6.28-15.664c0-4.063.986-7.76 2.921-11.163 1.972-3.404 4.637-6.075 8.069-8.088 3.395-1.94 7.083-2.965 11.026-2.965m-.109 7.906c-3.907 0-7.193 1.354-9.858 4.099-2.665 2.708-3.98 6.185-3.98 10.394 0 4.685 1.68 8.381 5.039 11.126q3.888 3.184 8.981 3.184c3.797 0 7.047-1.39 9.748-4.135 2.702-2.782 4.016-6.186 4.016-10.212s-1.35-7.43-4.052-10.248-5.988-4.208-9.894-4.208m34.21-6.808h8.507c4.673 0 7.995.403 9.967 1.245 1.971.841 3.578 2.232 4.783 4.172s1.825 4.245 1.825 6.88c0 2.782-.657 5.124-2.008 6.991-1.314 1.867-3.322 3.294-6.024 4.246l10.004 18.812h-8.799l-9.493-17.934h-.73v17.934h-8.032V78.216Zm8.032 16.543h2.519c2.556 0 4.308-.33 5.294-1.025s1.461-1.793 1.461-3.367a4.2 4.2 0 0 0-.731-2.415c-.474-.696-1.131-1.172-1.935-1.464-.803-.293-2.263-.44-4.417-.44h-2.191z"></path>
    <path fill="#FFDE66" d="M4.226 183a4.26 4.26 0 0 1-2.994-1.244 4.24 4.24 0 0 1-1.204-3.477L20.765 3.736A4.29 4.29 0 0 1 22.481.808a4.28 4.28 0 0 1 3.323-.732L280.79 51.828a4.22 4.22 0 0 1 3.25 3.11l21.833 87.107a4.28 4.28 0 0 1-.621 3.441 4.23 4.23 0 0 1-2.957 1.793L4.701 182.963c-.146.037-.329.037-.475.037M28.616 9.3 9.045 173.96l287.481-34.513-20.007-79.86L28.615 9.299Z"></path>
  </svg>
);

export const RestorCard = ({ mediaSize, activeProjectData }) => {
  const [displayedInsight, setDisplayedInsight] = useState('carbon');
  const [allData, setAllData] = useState({
    carbon: {},
    biodiversity: {},
    ecoregionsBiomes: {},
    environment: {},
    water: {},
    ecosystems: {},
    scientificMonitoring: {},
    treeCover: {},
  });

  useEffect(() => {
    console.log(allData);
    console.log(activeProjectData);
  }, [allData, activeProjectData]);

  useEffect(() => {
    const loadJsonFiles = async (siteName) => {
      const formattedName = toKebabCase(siteName);
      const baseURL = `${process.env.AWS_STORAGE}/restor/chartData/${formattedName}`;
      const jsonFiles = {
        carbon: 'carbon.json',
        biodiversity: 'biodiversity.json',
        ecoregionsBiomes: 'ecoregions_biomes.json',
        environment: 'environment.json',
        water: 'water.json',
        ecosystems: 'ecosystems.json',
        scientificMonitoring: 'scientific_monitoring.json',
        treeCover: 'tree_cover.json',
      };
      try {
        const dataPromises = Object.entries(jsonFiles).map(([key, file]) =>
          fetch(`${baseURL}/${file}`).then((response) =>
            response.json().then((data) => ({ [key]: data[key] }))
          )
        );
        const responses = await Promise.all(dataPromises);
        const combinedData = responses.reduce(
          (acc, data) => ({ ...acc, ...data }),
          {}
        );
        setAllData(combinedData);
      } catch (error) {
        console.error('Error loading JSON files:', error);
      }
    };

    loadJsonFiles(activeProjectData?.project?.name);
  }, [activeProjectData]);

  return (
    <InfoBox mediaSize={mediaSize}>
      <HeaderContainer>
        <h1>Remote Sensing Analysis</h1>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Info size={20} style={{ marginRight: '8px', color: '#669629' }} />
          <p style={{ marginTop: '10px' }}>
            Remote Sensing Analysis queried through Restor.
          </p>
        </div>
      </HeaderContainer>
      <IconBar>
        <IconButton
          buttonIcon={'pets'}
          active={displayedInsight === 'biodiversity'}
          onClick={() => setDisplayedInsight('biodiversity')}
          dataTooltipId={'remote-sensing-biodiversity-insight'}
        />
        <Tooltip id="remote-sensing-evapotranspiration-insight">
          Biodiversity
        </Tooltip>
        <IconButton
          buttonIcon={'forest'}
          active={displayedInsight === 'treeCover'}
          onClick={() => setDisplayedInsight('treeCover')}
          dataTooltipId={'remote-sensing-cover-insight'}
        />
        <Tooltip id="remote-sensing-cover-insight">Land and Tree Cover</Tooltip>
        <IconButton
          buttonIcon={'co2'}
          active={displayedInsight === 'carbon'}
          onClick={() => setDisplayedInsight('carbon')}
          dataTooltipId={'remote-sensing-carbon-insight'}
        />
        <Tooltip id="remote-sensing-carbon-insight">Carbon</Tooltip>
        <IconButton
          buttonIcon={'water_drop'}
          active={displayedInsight === 'water'}
          onClick={() => setDisplayedInsight('water')}
          dataTooltipId={'remote-sensing-evapotranspiration-insight'}
        />
        <Tooltip id="remote-sensing-evapotranspiration-insight">
          Evapotranspiration
        </Tooltip>
      </IconBar>
      {displayedInsight === 'biodiversity' && (
        <BiodiversityChart
          projectArea={activeProjectData?.project?.area}
          chartData={allData}
        />
      )}
      {displayedInsight === 'carbon' && (
        <CarbonChart
          projectArea={activeProjectData?.project?.area}
          chartData={allData?.carbon}
        />
      )}
      {displayedInsight === 'water' && (
        <WaterChart
          projectArea={activeProjectData?.project?.area}
          chartData={allData?.water}
        />
      )}
      {displayedInsight === 'treeCover' && (
        <TreeCoverChart
          projectArea={activeProjectData?.project?.area}
          treeData={allData?.treeCover}
          ecosystemsData={allData?.ecosystems}
          scientificMonitoring={allData?.scientificMonitoring}
        />
      )}
      <Footer>
        <span>API provided by</span>
        <LogoLink href="https://restor.eco" target="_blank" rel="noopener noreferrer">
          <RestorLogo />
        </LogoLink>
      </Footer>
    </InfoBox>
  );
};

const HeaderContainer = styled.div`
  margin-left: 16px;
  margin-bottom: 8px;
`;

const IconBar = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  gap: 6px;
  margin-left: 16px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 16px;
  margin-top: 16px;
  border-top: 1px solid #e0e0e0;
  font-size: 12px;
  color: #666;
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  margin-left: 8px;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(102, 150, 41, 0.1);
  }
`;
