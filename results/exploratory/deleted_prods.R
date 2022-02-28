### Norming Data

And here is the norming data values:
  
  ```{r ECHO=TRUE}
norming_data <- read.csv("norming_data.csv") %>%
  filter(id!="example1") %>% # Will filter out non-critical trials, i.e. the example trial from the beginning of the experiment
  mutate(equalized_response = ifelse(scale=="FM",8-response,response)) %>% # This will render all data points on the same scale, as participants randomly received either "very likely a man" or "very likely a woman" as the left end of their response scale, with the other appearing at the right end
  mutate(orthog = ifelse(orthog=="sroceress","sorceress",orthog)) %>% # Fixes a typo
  mutate(id = ifelse(id=="Stunt_double","stunt double",id)) %>% # This, as well as all lines below it, convert compounds formed by spaces from their underscore forms to their spaced forms (e.g. police_officer -> Police officer)
  mutate(id = ifelse(id=="Police_officer","police officer",id)) %>%
  mutate(id = ifelse(id=="Flight_attendant","flight attendant",id)) %>%
  mutate(id = ifelse(id=="Anchor","anchor",id)) %>%
  mutate(id = ifelse(id=="Businessperson","businessperson",id)) %>%
  mutate(id = ifelse(id=="Camera","camera operator",id)) %>%
  mutate(id = ifelse(id=="Congressperson","congressperson",id)) %>%
  mutate(id = ifelse(id=="Craftsperson","craftsperson",id)) %>%
  mutate(id = ifelse(id=="Crewmember","crewmember",id)) %>%
  mutate(id = ifelse(id=="Firefighter","firefighter",id)) %>%
  mutate(id = ifelse(id=="Foreperson","foreperson",id)) %>%
  mutate(id = ifelse(id=="Layperson","layperson",id)) %>%
  mutate(id = ifelse(id=="Meteorologist","meteorologist",id)) %>%
  mutate(id = ifelse(id=="Salesperson","salesperson",id)) %>%
  mutate(id = ifelse(id=="Actor","actor",id)) %>%
  mutate(id = ifelse(id=="Heir","heir",id)) %>%
  mutate(id = ifelse(id=="Hero","hero",id)) %>%
  mutate(id = ifelse(id=="Host","host",id)) %>%
  mutate(id = ifelse(id=="Hunter","hunter",id)) %>%
  mutate(id = ifelse(id=="Villain","villain",id)) %>%
  mutate(orthog = ifelse(orthog=="airline steward","steward",orthog)) %>%
  mutate(orthog = ifelse(orthog=="airline stewardess","stewardess",orthog))
```

```{r ECHO=TRUE}
norming_exclusion <- norming_data %>% 
  filter(gender=="female") %>% 
  group_by(workerid) %>%
  summarize(female_mean = mean(equalized_response)) %>%
  unique() %>% 
  mutate(exclusion = female_mean < mean(female_mean) - 2*sd(female_mean)) %>%
  filter(exclusion==TRUE)
```

```{r ECHO=TRUE}
norming_data <- norming_data[!(norming_data$workerid %in% norming_exclusion$workerid),]
```

```{r}
norming_means <- norming_data %>%
  filter(neutral_morh !="male_adoption") %>%
  group_by(orthog,id) %>%
  summarise(indi_mean = mean(equalized_response), trial_count=n()) %>%
  rename(form = orthog) %>%
  rename(lexeme =id)
```

```{r}
norming_adoptions <- norming_data %>%
  filter(neutral_morh == "male_adoption") %>%
  group_by(orthog) %>%
  summarise(indi_mean = mean(equalized_response), trial_count=n()) %>%
  mutate(lexeme = ifelse(orthog=="actress","actor",ifelse(orthog=="heiress","heir",ifelse(orthog=="heroine","hero",ifelse(orthog=="hostess","host",ifelse(orthog=="huntress","hunter",ifelse(orthog=="villainess","villain",orthog))))))) %>%
  rename(form = orthog)
```

```{r}
norming_adoptions <- norming_adoptions[, c("lexeme", "form", "indi_mean", "trial_count")]
```

```{r}
norming_means <- rbind(norming_means,norming_adoptions) %>%
  rename(lexeme_norm = lexeme)
```

```{r include=FALSE}
later_criticals <- c("actor","anchor","businessperson","camera operator","congressperson","craftsperson","crewmember","firefighter","flight attendant","foreperson","heir","hero","host","hunter","layperson","meteorologist","police officer","salesperson","stunt double","villain")
```

```{r include=FALSE}
norming_means <- norming_means[(norming_means$lexeme_norm %in% later_criticals),]
```

**Neutrals Only**
  
  ```{r}
norming_means_neutral <- norming_data %>%
  filter(gender=="neutral") %>%
  filter(neutral_morh !="male_adoption") %>%
  group_by(orthog,id) %>%
  summarise(indi_mean = mean(equalized_response), trial_count=n()) %>%
  rename(form = orthog) %>%
  rename(lexeme =id)
```

```{r}
norming_adoptions_neutral <- norming_data %>%
  filter(gender=="neutral") %>%
  filter(neutral_morh == "male_adoption") %>%
  group_by(orthog) %>%
  summarise(indi_mean = mean(equalized_response), trial_count=n()) %>%
  mutate(lexeme = ifelse(orthog=="actress","actor",ifelse(orthog=="heiress","heir",ifelse(orthog=="heroine","hero",ifelse(orthog=="hostess","host",ifelse(orthog=="huntress","hunter",ifelse(orthog=="villainess","villain",orthog))))))) %>%
  rename(form = orthog)
```

```{r}
norming_adoptions_neutral <- norming_adoptions_neutral[, c("lexeme", "form", "indi_mean", "trial_count")]
```

```{r}
norming_means_neutral <- rbind(norming_means_neutral,norming_adoptions_neutral)
```

```{r include=FALSE}
norming_means_neutral <- norming_means_neutral[(norming_means_neutral$lexeme %in% later_criticals),]
```

