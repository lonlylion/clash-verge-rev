import { Box } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";

import { ScrollTopButton } from "@/app/layout/components/scroll-top-button";
import { useAppData } from "@/app/providers/app-data-context";
import { BaseEmpty, BasePage } from "@/components/base";
import { SearchBox } from "@/components/ui/search-box";
import { ProviderButton } from "@/features/rules/components/provider-button";
import RuleItem from "@/features/rules/components/rule-item";
import { useVisibility } from "@/hooks/use-visibility";

const RulesPage = () => {
  const { t } = useTranslation();
  const { rules = [], refreshRules, refreshRuleProviders } = useAppData();
  const [match, setMatch] = useState(() => (_: string) => true);
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pageVisible = useVisibility();

  // 在组件挂载时和页面获得焦点时刷新规则数据
  useEffect(() => {
    refreshRules();
    refreshRuleProviders();

    if (pageVisible) {
      refreshRules();
      refreshRuleProviders();
    }
  }, [refreshRules, refreshRuleProviders, pageVisible]);

  const filteredRules = useMemo(() => {
    return rules.filter((item) => match(item.payload));
  }, [rules, match]);

  const scrollToTop = () => {
    virtuosoRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = (e: any) => {
    setShowScrollTop(e.target.scrollTop > 100);
  };

  return (
    <BasePage
      full
      title={t("rules.page.title")}
      contentStyle={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
      header={
        <Box display="flex" alignItems="center" gap={1}>
          <ProviderButton />
        </Box>
      }
    >
      <Box
        sx={{
          pt: 1,
          mb: 0.5,
          mx: "10px",
          height: "36px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <SearchBox onSearch={(match) => setMatch(() => match)} />
      </Box>

      {filteredRules && filteredRules.length > 0 ? (
        <>
          <Virtuoso
            ref={virtuosoRef}
            data={filteredRules}
            style={{
              flex: 1,
            }}
            itemContent={(index, item) => (
              <RuleItem index={index + 1} value={item} />
            )}
            followOutput={"smooth"}
            scrollerRef={(ref) => {
              if (ref) ref.addEventListener("scroll", handleScroll);
            }}
          />
          <ScrollTopButton onClick={scrollToTop} show={showScrollTop} />
        </>
      ) : (
        <BaseEmpty />
      )}
    </BasePage>
  );
};

export default RulesPage;
