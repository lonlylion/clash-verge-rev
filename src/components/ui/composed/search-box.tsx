import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import matchCaseIcon from "@/assets/image/component/match_case.svg?react";
import matchWholeWordIcon from "@/assets/image/component/match_whole_word.svg?react";
import useRegularExpressionIcon from "@/assets/image/component/use_regular_expression.svg?react";

import { Input } from "../primitives";

export type SearchState = {
  text: string;
  matchCase: boolean;
  matchWholeWord: boolean;
  useRegularExpression: boolean;
};

interface SearchBoxProps {
  placeholder?: string;
  matchCase?: boolean;
  matchWholeWord?: boolean;
  useRegularExpression?: boolean;
  onSearch: (match: (content: string) => boolean, state: SearchState) => void;
}

export const SearchBox = ({
  placeholder,
  matchCase: defaultMatchCase = false,
  matchWholeWord: defaultMatchWholeWord = false,
  useRegularExpression: defaultUseRegularExpression = false,
  onSearch,
}: SearchBoxProps) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const onSearchRef = useRef(onSearch);
  const [matchCase, setMatchCase] = useState(defaultMatchCase);
  const [matchWholeWord, setMatchWholeWord] = useState(defaultMatchWholeWord);
  const [useRegularExpression, setUseRegularExpression] = useState(
    defaultUseRegularExpression,
  );
  const [errorMessage, setErrorMessage] = useState("");

  const validateRegex = useCallback((pattern: string) => {
    if (!pattern) return true;
    try {
      new RegExp(pattern);
      return true;
    } catch (error) {
      console.warn("[SearchBox] invalid regex", error);
      return false;
    }
  }, []);

  const createMatcher = useMemo(() => {
    return (searchText: string) => {
      if (useRegularExpression && searchText) {
        const isValid = validateRegex(searchText);
        if (!isValid) {
          return () => false;
        }
      }

      return (content: string) => {
        if (!searchText) {
          return true;
        }

        const normalizedContent = matchCase ? content : content.toLowerCase();
        const normalizedSearch = matchCase
          ? searchText
          : searchText.toLowerCase();

        if (useRegularExpression) {
          return new RegExp(normalizedSearch).test(normalizedContent);
        }

        if (matchWholeWord) {
          return new RegExp(`\\b${normalizedSearch}\\b`).test(
            normalizedContent,
          );
        }

        return normalizedContent.includes(normalizedSearch);
      };
    };
  }, [matchCase, matchWholeWord, useRegularExpression, validateRegex]);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    if (!inputRef.current) return;
    const value = inputRef.current.value;
    const matcher = createMatcher(value);
    onSearchRef.current(matcher, {
      text: value,
      matchCase,
      matchWholeWord,
      useRegularExpression,
    });
  }, [matchCase, matchWholeWord, useRegularExpression, createMatcher]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ?? "";
    setErrorMessage("");

    if (useRegularExpression && value) {
      const isValid = validateRegex(value);
      if (!isValid) {
        setErrorMessage(t("shared.validation.invalidRegex"));
      }
    }

    const matcher = createMatcher(value);
    onSearchRef.current(matcher, {
      text: value,
      matchCase,
      matchWholeWord,
      useRegularExpression,
    });
  };

  const toggleRegex = () => {
    setUseRegularExpression((prev) => {
      const next = !prev;
      if (!next) {
        setErrorMessage("");
      } else {
        const value = inputRef.current?.value ?? "";
        if (value && !validateRegex(value)) {
          setErrorMessage(t("shared.validation.invalidRegex"));
        }
      }
      return next;
    });
  };

  return (
    <div className="flex items-center gap-2 rounded-md border border-[var(--verge-color-border)] bg-[var(--verge-color-surface)] px-2 py-1">
      <Input
        ref={inputRef}
        onChange={onChange}
        placeholder={placeholder ?? t("shared.placeholders.filter")}
        className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0"
      />
      <div className="flex gap-1">
        <IconToggle
          icon={matchCaseIcon}
          active={matchCase}
          label={t("shared.placeholders.matchCase")}
          onClick={() => setMatchCase((prev) => !prev)}
        />
        <IconToggle
          icon={matchWholeWordIcon}
          active={matchWholeWord}
          label={t("shared.placeholders.matchWholeWord")}
          onClick={() => setMatchWholeWord((prev) => !prev)}
        />
        <IconToggle
          icon={useRegularExpressionIcon}
          active={useRegularExpression}
          label={t("shared.placeholders.useRegex")}
          onClick={toggleRegex}
        />
      </div>
      {errorMessage && (
        <span className="text-xs text-[var(--verge-color-destructive)]">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

interface IconToggleProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  label: string;
  onClick: () => void;
}

const IconToggle = ({
  icon: Icon,
  active,
  label,
  onClick,
}: IconToggleProps) => (
  <button
    type="button"
    aria-label={label}
    className={`rounded-md p-1 transition-colors ${
      active
        ? "bg-[var(--verge-color-primary-soft)] text-[var(--verge-color-primary)]"
        : "text-[var(--verge-color-muted-foreground)] hover:bg-[var(--verge-color-surface-muted)]"
    }`}
    onClick={onClick}
  >
    <Icon height={20} width={20} />
  </button>
);
