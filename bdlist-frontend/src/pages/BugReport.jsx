import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import SpeedDialComponent from '../components/SpeedDialComponent';
const BugReport = () => {
  const [version, setVersion] = useState('');
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchMarkdown = async () => {
      const response = await fetch(
        'https://raw.githubusercontent.com/shuttleday/shuttleday/main/docs/CHANGELOG.md'
      );
      const text = await response.text();
      const myRegex = /\[(.*?)\]/;
      const myMatch = text.match(myRegex);

      const version = myMatch ? myMatch[1] : null;

      setVersion(version);

      setTimeout(() => {
        setLoad(false);
      }, 1500);
    };
    fetchMarkdown();
  }, []);

  return (
    <div>
      <div className='flex justify-center items-center flex-col'>
        <div className='py-6'>
          <div className=' border-2 border-green-500 rounded-md'>
            <h1 className=' text-4xl p-4'>Bug Report</h1>
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
              <div className='overflow-hidden'>
                <table className='min-w-full border text-center text-sm font-light dark:border-neutral-500 w-[300px] md:w-[500px]'>
                  <thead className='border-b font-medium text-lg text-white dark:border-neutral-500 dark:bg-green-400'>
                    <tr>
                      <th
                        scope='col'
                        className='border-r px-6 py-4 dark:border-neutral-500'
                      >
                        Version
                      </th>
                      <th
                        scope='col'
                        className='border-r px-6 py-4 dark:border-neutral-500'
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className=' text-base'>
                    <tr className='border-b dark:border-neutral-500'>
                      <td className='whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500'>
                        {version}
                      </td>
                      <td className='whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500 font-bold'>
                        {load ? (
                          <Loading />
                        ) : (
                          <div className='flex items-center justify-center animate-pulse'>
                            <div className='bg-red-500 w-3 h-3 rounded-full mr-2'></div>
                            LIVE
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className='text-left w-[300px] md:w-[500px] mt-16 mb-16'>
            <h1 className='text-3xl'>Found bugs?</h1>
            <p className='text-2xl mt-4'>
              You can always report the bugs on our github issues{' '}
              <a
                className=' text-blue-400'
                href='https://github.com/shuttleday/shuttleday/issues/new/choose'
              >
                here.
              </a>
            </p>

            <p className='text-2xl py-10'>
              When reporting bugs please ensure these following information is
              included.
            </p>
            <ul className='list-disc list-inside text-xl'>
              <li>The version number</li>
              <li>Description of the bug</li>
              <li>Procedures of producing the bug</li>
              <li>Screenshots (if you feel like it)</li>
            </ul>
          </div>
        </div>
      </div>
      <SpeedDialComponent />
    </div>
  );
};

export default BugReport;
