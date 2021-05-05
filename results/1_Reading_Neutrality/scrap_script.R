
```{r}
to_plot <- all_data %>%
  group_by(condition) %>%
  summarise(mean_rt = mean(rt), CI.LOW = ci.low(rt), CI.HIGH = ci.high(rt)) %>%
  ungroup() %>%
  mutate(YMin = mean_rt-CI.LOW, YMax = mean_rt+CI.HIGH)
```


```{r}
ggplot(to_plot,aes(x=condition,y=mean_rt, fill=condition)) + 
  geom_bar(stat='identity') + 
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25)
```


```{r}
all_data %>% filter(lexeme!= 'actor' & lexeme!= 'host' & lexeme !='hunter' & lexeme!= 'villain' & lexeme!= 'heir' & lexeme!= 'hero') %>%
  group_by(trial_gender) %>%
  summarise(mean_rt = mean(rt)) %>%
  ggplot(aes(x= trial_gender, y=mean_rt)) + 
  geom_col()
```

```{r}
all_data %>%
  filter(lexeme!= 'actor' & lexeme!= 'host' & lexeme !='hunter' & lexeme!= 'villain' & lexeme!= 'heir' & lexeme!= 'hero') %>%
  group_by(trial_congruency) %>%
  summarise(mean_rt = mean(rt)) %>%
  ggplot(aes(x= trial_congruency, y=mean_rt)) + 
  geom_col()
```


```{r}
all_data %>%
  group_by(morph_type) %>%
  summarise(mean_rt = mean(rt)) %>%
  ggplot(aes(x= morph_type, y=mean_rt)) + 
  geom_col()
```

```{r}
all_data %>%
  group_by(form_length) %>%
  summarise(mean_rt = mean(rt)) %>%
  ggplot(aes(x= form_length, y=mean_rt)) + 
  geom_col()
```

```{r}
reg_analysis <- lmer(log(rt)~condition*morph_type + (1|workerid) + (1|lexeme) + (1|form_length), data = all_data)
```

```{r}
summary(reg_analysis)
```

