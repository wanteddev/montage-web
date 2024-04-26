import Head from 'next/head';
import { useCallback, useRef, useState } from 'react';
import { Portal } from '@wanteddev/wds';
import {
  DocSearchButton,
  DocSearchModal,
  useDocSearchKeyboardEvents,
} from '@docsearch/react';

const indexName = 'wds-docs';

const Search = () => {
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [initialQuery, setInitialQuery] = useState<string | undefined>(
    undefined,
  );

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
    searchButtonRef.current?.focus();
  }, [setIsOpen]);

  const onInput = useCallback(
    (event: KeyboardEvent) => {
      setIsOpen(true);
      setInitialQuery(event.key);
    },
    [setIsOpen, setInitialQuery],
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href={`https://${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      <DocSearchButton onClick={onOpen} ref={searchButtonRef} />

      {isOpen && (
        <Portal>
          <DocSearchModal
            appId={process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION!}
            apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!}
            indexName={indexName}
            onClose={onClose}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            searchParameters={{ facetFilters: [] }}
          />
        </Portal>
      )}
    </>
  );
};

export default Search;
